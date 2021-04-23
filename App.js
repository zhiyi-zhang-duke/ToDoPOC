import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Header from './components/Header';
import AddItem from './components/AddItem';
import ListItem from './components/ListItem';

const App = () => {
  const randId = id => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const [items, setItems] = useState([
    {
      id: randId(),
      text: 'Dishes',
    },
    {
      id: randId(),
      text: 'Clean',
    },
    {
      id: randId(),
      text: 'Check mail',
    }    
  ]);  
  const [checkedItems, checkedItemChange] = useState([]);


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const addItem = text => {
    if (!text) {
      Alert.alert(
        'No item entered',
        'Please enter an item when adding to your shopping list',
        [
          {
            text: 'Understood',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      setItems(prevItems => {
        return [{id: randId(), text}, ...prevItems];
      });
    }
  };

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  console.debug(items)
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header title="To-Do List" />
      <AddItem addItem={addItem} />
      <FlatList
        style={backgroundStyle}
        data={items}
        renderItem={({item}) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            checkedItems={checkedItems}
          />
        )}>
        </FlatList>        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
