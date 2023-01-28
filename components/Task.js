import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native'

const Task = ({ text, index, finished, handleRemoveTask, handleToggleFinish, handleTextChange }) => {

    return (
        <View style={styles.taskWrapper}>
            <View style={styles.left}>
                <TouchableOpacity onPressIn={() => {
                    handleToggleFinish(index)
                }}>
                    <View style={styles.checkbox}>
                        <Text>{finished ? '✔️' : ''}</Text>
                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        ...styles.text,
                        color: finished ? 'lightgrey' : 'black',
                        textDecorationLine: finished ? 'line-through' : 'none',
                    }}
                    onPress={()=>{
                        handleTextChange(text, index)
                    }}
                >{text}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveTask(index)} style={styles.right}>
                <Text style={styles.circular}>🗑</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    taskWrapper: {
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '85%'
    },
    checkbox: {
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        borderRadius: 5,
        opacity: 0.4,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        width: '83%',
        margin: 0,
        height: 24
    },
    right: {
        width: '20%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },
    circular: {
        color: 'red',
        fontWeight: 'bold'
    }
})

export default Task
