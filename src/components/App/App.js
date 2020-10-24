import React, {Component} from 'react';
import Section from '../Header/Section.js';
import ContactForm from '../ContactsForm/ContactsForm.js';
import ContactList from '../ContactsList/ContactsList.js';
import Filter from '../Filter/Filter.js';
import styles from './main.module.css';
import Notification from './../Notification/Notification.js';



class App extends Component {
    state = {
      contacts: [],
      filter: "",
      alert: false,
    };
  
    componentDidMount(){
      const contacts = localStorage.getItem('contacts');

      if(contacts){
        this.setState({contacts: JSON.parse(contacts)})
      }
    }

    componentDidUpdate(prevProps, prevState){
      const {contacts} = this.state;
      if(prevState.contacts !== contacts){
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    }

    changeHandler = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };
  
    deleteContactbyId = (id) => {
      const { contacts } = this.state;
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      this.setState({
        contacts: [...updatedContacts],
      });
    };
  
    addContact = (contact) => {
      const newName = contact.name;
      const names = this.state.contacts.map((contact) =>
        contact.name.toLowerCase()
      );
      if (names.includes(newName.toLowerCase())) {
        this.setState({ alert: true });
        setTimeout(() => {
          this.setState({ alert: false });
        }, 3000);
      } else {
        this.setState((state) => ({
          contacts: [...state.contacts, contact],
        }));
      }
    };
  
    filterContactsByName = () => {
      const { contacts, filter } = this.state;
      if (contacts.length) {
        return contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
      }
    };
  
    render() {
      const { contacts, alert } = this.state;
    
      return (
        <div className={styles.container}>
          <Section title="Phonebook"/>
          <Notification alert={alert} />
            <ContactForm addContact={this.addContact} />
         <div> <h2 className={styles.contactsTitle}>Contacts</h2>
            {contacts.length > 1 && <Filter onChange={this.changeHandler} />}
            {contacts.length ? 
            <ContactList
              contacts={this.filterContactsByName()}
              onDelete={this.deleteContactbyId}
            /> : (<p>There is no contacts</p>)
          }
          </div>
        </div>
      );
    }
  }
  
  export default App;