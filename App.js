import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    console.log('render')
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('todo-list').then(items => {
            if (items == null) {
                return
            }
            const newTasks = Object.values(JSON.parse(items))
            setTasks(newTasks)
        })
    }, [setTasks])

    const [newTaskText, setNewTaskText] = useState('')

    const handleNewTaskText = (text) => {
        setNewTaskText(text)
    }

    const handleAddTask = () => {
        if (newTaskText.length == 0) {
            return
        }

        if (Keyboard.isVisible()) {
            Keyboard.dismiss()
        }

        if (isEditing) {
            let newTasks = [...tasks]
            newTasks[index].name = newTaskText
            setTasks(newTasks)
            setIsEditing(false)
        } else
            setTasks(old => [{ name: newTaskText, finished: false }, ...old])

        setNewTaskText('')
    }

    const handleRemoveTask = (index) => {
        const copy = [...tasks]
        copy.splice(index, 1)
        setTasks(copy)
    }

    const [taskCount, setTaskCount] = useState(0)
    const [finishedTasksCount, setFinishedTaskCount] = useState(0)

    useEffect(() => {
        setTaskCount(tasks.length)
        setFinishedTaskCount(
            tasks.filter(t => {
                return t.finished == false
            }).length
        )
        AsyncStorage.setItem('todo-list', JSON.stringify(tasks))
    }, [tasks])

    const handleToggleFinish = (index) => {
        let newTasks = [...tasks]
        newTasks[index].finished = !tasks[index].finished
        setTasks(newTasks)
    }

    const textInput = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const [index, setIndex] = useState(0)
    const handleTextChange = (text, index) => {
        textInput.current?.focus()
        setIsEditing(true)
        setIndex(index)
        setNewTaskText(text)
    }

    return (
        <View
            style={styles.container}
        >
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>You have {taskCount} tasks, {finishedTasksCount} unfinished</Text>

                <ScrollView
                    style={{
                        ...styles.items,
                        height: Dimensions.get('screen').height - 300,
                    }}
                    fadingEdgeLength={100}
                >
                    {tasks.map((item, index) => {
                        return (
                            <Task
                                text={item.name}
                                key={index}
                                index={index}
                                finished={item.finished}
                                handleRemoveTask={handleRemoveTask}
                                handleToggleFinish={handleToggleFinish}
                                handleTextChange={handleTextChange}
                            />
                        )
                    })}
                </ScrollView>
            </View>

            <View style={styles.writeTaskWrapper}>
                <TextInput
                    style={styles.writeTaskTextField}
                    placeholder={'Write a task'}
                    onChangeText={handleNewTaskText}
                    onEndEditing={() => {
                        handleAddTask()
                    }}
                    value={newTaskText}
                    ref={textInput} />
            </View>
            <StatusBar style='auto' />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebeaed',
        flex: 1
    },
    taskWrapper: {
        marginTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30
    },
    items: {
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 0,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    writeTaskTextField: {
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 7,
        paddingHorizontal: 15,
        width: '100%',
        borderColor: '#C0c0c0',
        borderWidth: 1
    },
});
