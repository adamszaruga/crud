import React from 'react';
import { Users, Briefcase, Map } from 'react-feather';
import { compose, withHandlers, withState } from 'recompose';
import { withRouter, NavLink, Route } from 'react-router-dom';
const enhance = compose(
    withRouter,
    withState('filter', 'setFilter', ''),
    withHandlers({
        addTarget: props => () => {
            // doSomething().then(({ id }) => {
            //     props.history.push(`/owners/${id}`)
            // })
            alert('add');
        },
        filterTargets: props => () => {
            return props.data.getTargets.filter((target) => {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] !== "__typename" && keys[i] !== "id")  {
                        if (keys[i] === 'contacts') {
                            let check = target[keys[i]].some(item=>{     
                                return item.name.toLowerCase().indexOf(props.filter) > -1   
                            });
                            if (check) return true;
                        }else {
                            let value = String(target[keys[i]]).toLowerCase();
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

const STATUS_COLORS = {
    researching: 'primary',
    pending: 'secondary',
    approved: 'success',
    declined: 'danger'
}

const Targets = ({data, addTarget, filterTargets, setFilter, match}) => (
<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Targets</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={addTarget}>New Target</button>
            </div>
        </div>
    </div>
    <div className="d-flex data-table">
        <div className="list-group list-group-flush w-100">
            <div className="list-group-item text-light" style={{ backgroundColor: "#4C5256" }}>
                <input onInput={(e) => setFilter(e.target.value.toLowerCase())} className="form-control form-control-dark w-100" type="text" placeholder="Quick Search" aria-label="Search" />
            </div>
            {
                data.getTargets.length === 0
                ? 'No targets'
                : filterTargets().map((target) => (
                    <NavLink exact to={`${match.path}/${target.id}`} className="list-group-item list-group-item-action flex-column align-items-start" key={target.id}>
                        <div className="d-flex w-100 justify-content-between align-items-baseline">
                            <h5>{target.name}</h5>
                            <span className={`badge badge-${STATUS_COLORS[target.status]}`}>{target.status}</span>
                        </div>
                        <div className="row no-gutters justify-content-start align-items-start">
                            <span className="col-12 mr-5">
                                <div className="d-flex align-items-start">
                                    <Users className="feather mr-2" style={{ marginTop: "0.16rem" }} />{target.contacts.length > 0? target.contacts.map(contact=>contact.name).join(', ') : <i>No Contacts</i>}
                                </div>
                            </span>
                        </div>
                    </NavLink> 
                ))
            }
        </div>
{/* 
        {
            !isLoaded(owners)
                ? ''
                : <Route exact path={`${match.path}/:id`} render={({ match }) => {
                    let owner = owners.find(owner => owner.id === match.params.id);
                    return <Owner key={owner ? owner.id : 'noownerfound'}
                        owner={owner}
                        deleteOwner={deleteOwner}
                        updateOwner={updateOwner}
                        editMode={owner ? (owner.name === NEW_OWNER_NAME ? true : false) : false} />
                }} />
        } */}


    </div>
</div>
)

export default enhance(Targets);
