import React, {Component} from 'react';
import {
    View,
    Button,
    TextInput,
    StyleSheet,
    ScrollView,
    ToastAndroid
} from 'react-native';
import firebase from "react-native-firebase";

class AddTaskScreen extends Component {
    constructor() {
        super();
        this.state= {
            task: ``,
            title: ``,
            comment: ``
        }
    }
    static navigationOptions = ({navigation}) => {
        const params= navigation.state.params || {};
        return {
            title: 'Add tasks',
            headerTintColor: 'grey',
            headerTitleStyle: {
                fontWeight: '300',
                fontFamily: 'Jua'
            },
        }
      };
      saveTitle = (e) => {
        this.setState({title: e.nativeEvent.text})
      }
      saveTask = (e) => {
          this.setState({task: e.nativeEvent.text})
      }
      saveComment = (e) => {
        this.setState({comment: e.nativeEvent.text})
      }
      handleButton = () => {
        firebase.database().ref('/tasks').push({
            title: this.state.title,
            task: this.state.task,
            comment: this.state.comment
        }) 
        ToastAndroid.show('Task saved', ToastAndroid.SHORT)
        this.props.navigation.navigate('Home')
    }
    render() {
        return(
            <View style= {styles.container}>
                    <TextInput
                        placeholder= 'Title'
                        underlineColorAndroid= 'grey'
                        style= {styles.inputStyle}
                        onEndEditing= {(e) => this.saveTitle(e)}/>
                    <TextInput
                        placeholder= 'Add task'
                        multiline= {true}
                        numberOfLines= {5}
                        underlineColorAndroid= 'grey'
                        style= {styles.inputStyle}
                        onEndEditing= {(e) => this.saveTask(e)}/>
                    <TextInput
                        placeholder= 'Add comment if any'
                        underlineColorAndroid= 'grey'
                        style= {styles.inputStyle}
                        onEndEditing= {(e) => this.saveComment(e)}/>
                    <View style= {styles.buttonView}>
                        <Button
                            style= {styles.button} 
                            onPress= {()=> this.handleButton()}
                            title= 'Save task'
                            color= 'blue'/>
                    </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        margin: 20,
    },
    inputStyle: {
        
    },
    buttonView: {
        alignItems: 'center',
        margin: 50
    },
    button:{
        marginHorizontal: 20
    }
})

export default AddTaskScreen;