import React from "react";
import PropTypes from "prop-types";
import {TransitionGroup,CSSTransition } from 'react-transition-group';
import animation from './animation.module.css';
import styles from './list.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <TransitionGroup component="ul" className={styles.contactList}>
    {contacts.map((contact) => (
      <CSSTransition key={contact.id} classNames={animation} timeout={250} unmountOnExit>
        <li className={styles.contactListItem}>
          <span className={styles.name}>{contact.name}</span>
          <span className={styles.number}>{contact.number}</span>
          <button className={styles.closeBtn} type="button" onClick={() => onDelete(contact.id)}>
            &#215;
          </button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    PropTypes.array,
  ]),
  onDelete: PropTypes.func.isRequired,
};
export default ContactList;
