import React from 'react';
import { Target, Briefcase, Map } from 'react-feather';
import { compose, withHandlers, withState } from 'recompose';
import { withRouter, NavLink, Route } from 'react-router-dom';
const enhance = compose(
    withRouter,
    withState('filter', 'setFilter', ''),
    withHandlers({
        addContact: props => () => {
            // doSomething().then(({ id }) => {
            //     props.history.push(`/owners/${id}`)
            // })
            alert('add');
        },
        filterContacts: props => () => {
            return props.data.getContacts.filter((contact) => {
                var keys = Object.keys(contact);
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] !== "__typename" && keys[i] !== "id") {
                        if (keys[i] === 'target') {
                            if (contact[keys[i]].name.toLowerCase().indexOf(props.filter) > -1) {
                                return true;
                            }   
                        } else {
                            let value = String(contact[keys[i]]).toLowerCase();
                            if (value.indexOf(props.filter) > -1) {
                                return true;
                            }
                        }

                    }
                }
                return false;
            })
        }
    }),
)

const Contacts = ({ data, addContact, filterContacts, setFilter, match }) => (
    <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Contacts</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={addContact}>New Contact</button>
                </div>
            </div>
        </div>
        <div className="d-flex data-table">
            <div className="list-group list-group-flush w-100">
                <div className="list-group-item text-light" style={{ backgroundColor: "#4C5256" }}>
                    <input onInput={(e) => setFilter(e.target.value.toLowerCase())} className="form-control form-control-dark w-100" type="text" placeholder="Quick Search" aria-label="Search" />
                </div>
                {
                    data.getContacts.length === 0
                        ? 'No contacts'
                        : filterContacts().map((contact) => (
                            <NavLink exact to={`${match.path}/${contact.id}`} className="list-group-item list-group-item-action flex-column align-items-start" key={contact.id}>
                                <div className="d-flex w-100 justify-content-between align-items-baseline">
                                    <h5>{contact.name}</h5>
                                </div>
                                <div className="row no-gutters justify-content-start align-items-start">
                                    <span className="col-12 mr-5">
                                        <div className="d-flex align-items-start">
                                            <Target className="feather mr-2" style={{ marginTop: "0.16rem" }} />{contact.target ? contact.target.name : <i>No Target</i>}
                                        </div>
                                    </span>
                                </div>
                            </NavLink>
                        ))
                }
            </div>
        </div>
    </div>
)

export default enhance(Contacts);
