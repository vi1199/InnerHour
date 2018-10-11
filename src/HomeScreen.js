import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    TouchableHighlight,
    ListView,
    TextInput,
    Modal,
    Button,
    ToastAndroid,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';

class HomeScreen extends Component {
    constructor() {
        super();
        this.tasksRef = firebase.database().ref();
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
        this.state= {
            dataSource: dataSource,
            modalVisible: false,
            task: ``,
            title: ``,
            comment: ``,
        }
    }
    static navigationOptions = ({navigation}) => {
        const params= navigation.state.params || {};
        return {
            title: 'Your daily tasks',
            headerTintColor: 'grey',
            headerTitleStyle: {
                fontWeight: '300',
                fontFamily: 'Jua'
            },
            headerRight: (
                <TouchableOpacity onPress= {params.headerIconPress}>
                    <Text>Add Task</Text>
                </TouchableOpacity>
            )
        }
      };
      componentWillMount() {
        this.listenForTasks(this.tasksRef);
      }
      componentDidMount () {
        this.props.navigation.setParams({headerIconPress: this.AddTaskIconPress})
        this.listenForTasks(this.tasksRef);
      }
      listenForTasks(tasksRef) {
        tasksRef.on('value', (dataSnapshot) => {
          var tasks = [];
          dataSnapshot.forEach((child) => {
            tasks.push({
              title: child.val().title,
              task: child.val().task,
              comment: child.val().comment,
              _key: child.key
            });
          });
      
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(tasks)
          });
        });
      }
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }





      AddTaskIconPress=()=>{
      //   this.props.navigation.navigate('addTask')
      this.setModalVisible(!this.state.modalVisible);
      }

      renderRow(item){
          console.log('item is', item)
          return(
              <TouchableHighlight onPress = {() => this.handlePressRow(item)}>
              <View style= {styles.rowStyle}>
                <Text style= {styles.titleStyle}>{item.title}</Text>
                <Text style= {styles.taskTitle}>{item.task}</Text>
                <Text style= {styles.comment}>{item.comment ? item.comment : `No Comments`}</Text>
              </View>
              </TouchableHighlight>
          )
      }
      handlePressRow = (item)=> {
          console.log('item', item);
          
      }
      saveTitle = (e) => {
        this.setState({title: e})
      }
      saveTask = (e) => {
          this.setState({task: e})
      }
      saveComment = (e) => {
        this.setState({comment: e})
      }
      handleButton = () => {
        // firebase.database().ref('/tasks').push({
        //     title: this.state.title,
        //     task: this.state.task,
        //     comment: this.state.comment
        // }) 
        this.tasksRef.push({
                  title: this.state.title,
            task: this.state.task,
            comment: this.state.comment
        })
        ToastAndroid.show('Task saved', ToastAndroid.SHORT)
        this.setModalVisible(!this.state.modalVisible);
    }
    render() {
        this.tasksRef = firebase.database().ref();
        return(
            <View style= {styles.container}>

            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    
                }}>
                <View style= {styles.modalView}>
                    <TextInput
                        placeholder= 'Title'
                        underlineColorAndroid= 'grey'
                        style= {styles.inputStyle}
                        onChangeText= {(e) => this.saveTitle(e)}/>
                    <TextInput
                        placeholder= 'Add task'
                        multiline= {true}
                        numberOfLines= {5}
                        underlineColorAndroid= 'grey'
                        style= {styles.inputStyle}
                        onChangeText= {(e) => this.saveTask(e)}/>
                    <TextInput
                        placeholder= 'Add comment if any'
                        underlineColorAndroid= 'grey'
                        style= {styles.inputStyle}
                        onChangeText= {(e) => this.saveComment(e)}/>
                    <View style= {styles.buttonView}>
                        <Button
                            style= {styles.button} 
                            onPress= {()=> this.handleButton()}
                            title= 'Save task'
                            color= 'blue'/>
                    </View>
            </View>
            </Modal>
<ScrollView>

            <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={(item) => this.renderRow(item)}
                style={styles.listView}/>
                </ScrollView>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    modalView: {
        flex: 1,
        backgroundColor: 'transparent',
        margin: 20,
    },
    buttonView: {
        alignItems: 'center',
        margin: 50
    },
    rowStyle: {
        marginHorizontal: 10,
        marginVertical: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        elevation: 4,
        borderColor: 'grey'
    },
    titleStyle: {
        fontSize: 17,
        color: 'grey',
        fontWeight: '600',
        marginBottom: 5,
    },
    taskTitle: {
        fontSize: 12,
        color: 'grey'
    },
    comment: {
        fontSize: 12,
        color: 'grey'
    }
})

export default HomeScreen;