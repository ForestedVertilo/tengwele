import React, { Component } from 'react';
import { Spinner, Container, Header, Item, Input, Icon, Button, Text, Content, Accordion, Root  } from 'native-base';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {StatusBar} from 'react-native'
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import firebaseConfig from '../../config'
import words from '../lessons.json'
firebase.initializeApp(firebaseConfig)
import { actions as lessonActions, NAME as LESSON_NAME } from '../'
const mapStateToProps = (state) => {
    return {
      ...state[LESSON_NAME]
    }
  }
  
  const mapDispatchToProps = (dispatch) => bindActionCreators({
    ...lessonActions
  }, dispatch)

  

class LessonWords extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: false, words: [] }
    }
    async componentWillMount() {
        this.setState({ words })
        this.props.setLoading(true)
        await Font.loadAsync({
            'Roboto': require('../../node_modules/native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.props.setLoading(false)
    }
    dataArray = () => {
        return this.state.words.map((lesson, index) => {
            return { title: `Урок ${index + 1}`, content: lesson }
        })
    }
    renderContent = (item) => {
        return item.content.map(word => {
            return <Text style={{ paddingLeft: 10, paddingTop: 10 }} key={word.quenya}>
                <Text style={{ fontWeight: "600" }}>
                    {word.quenya + " "}
                </Text>
                <Text style={{ fontStyle: 'italic' }}>
                    {word.type + " "}
                </Text>
                <Text>
                    {"\"" + word.ru + "\""}
                </Text>
            </Text>
        })
    }
    searchWord = (text) => {
        const newWord = []
        words.forEach((lesson, indexLesson) => {
            newWord.push([])
            lesson.forEach((word, indexWord) => {
                if(word.quenya.match(new RegExp(text,"g")) || word.ru.match(new RegExp(text,"g"))) {
                    newWord[indexLesson].push(word)
                }
            })
        })
        this.setState({ words: newWord })
    }
    render() {
        return (
            <Root>
            <Container>
                {!this.props.isLoading ?
                    <React.Fragment>
                        <Header searchBar>
                        <StatusBar />
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Cese" onChange={e => this.searchWord(e.nativeEvent.text)}/>
                            </Item>
                            <Button transparent>
                                <Text>Search</Text>
                            </Button>
                        </Header>
                        <Content padder>
                            <Accordion dataArray={this.dataArray()} expanded={false} renderContent={this.renderContent} />
                        </Content>
                    </React.Fragment>
                    :
                    <Spinner color='red' />
                }
            </Container>
            </Root>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LessonWords)