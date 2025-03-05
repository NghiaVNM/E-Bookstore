import React from 'react'
import classes from './notFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound({message='Nothing found', linkRoute='/', linkText='Go to home'}) {
  return (
    <div className={classes.container}>
        {message}
        <Link to={linkRoute}>{linkText}</Link>
    </div>
  );
}