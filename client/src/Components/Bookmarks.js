import React from 'react';
import { compose } from 'recompose';
import { Target, User } from 'react-feather';
import withTargets from '../HOCs/TargetsQuery';
import withContacts from '../HOCs/ContactsQuery'; 
import { Link } from 'react-router-dom';

const enhance = compose(
    withTargets,
    withContacts
)
const Bookmarks = ({
    targetsData,
    contactsData,
    targetsLoading,
    contactsLoading,
    targetsError,
    contactsError
}) => (
targetsLoading || contactsLoading
? 'loading'
    : targetsError || contactsError
    ? 'error'
        :   <ul className="nav flex-column mb-2">
                {targetsData.getTargets.filter(target => target.isBookmarked).map(target => (
                    <li className="nav-item" key={target.id}>
                        <Link className="nav-link" to={`/targets/${target.id}`}>
                            <Target className="feather" />
                            {target.name}
                        </Link>
                    </li>
                ))}
                {contactsData.getContacts.filter(contact => contact.isBookmarked).map(contact => (
                    <li className="nav-item" key={contact.id}>
                        <Link className="nav-link" to={`/contacts/${contact.id}`}>
                            <User className="feather" />
                            {contact.name}
                        </Link>
                    </li>
                ))}
            </ul>
       
)
    


export default enhance(Bookmarks);
