import React from "react";
import PropTypes from "prop-types";
import styles from './header.module.css';
import { CSSTransition } from "react-transition-group";

const Section = () => {
  return (
    <CSSTransition
    in={true}
    appear={true}
    timeout={500}
    classNames={styles}
    unmountOnExit
    >
      <h2 className={styles.title}>Phonebook</h2>
    </CSSTransition>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Section;