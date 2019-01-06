import React from 'react';
import { Target as TargetIcon, Trash2, Edit2, Bookmark, User } from 'react-feather';
import { compose, withHandlers, withState } from 'recompose';
import { withRouter, NavLink } from 'react-router-dom';
import { withFormData, withIsSubmitting, withError, withValidationErrors } from '../HOCs/forms';
import withContacts from '../HOCs/ContactsQuery';
import withUpdateTarget from '../HOCs/UpdateTargetMutation';
import withDeleteTarget from '../HOCs/DeleteTargetMutation';
import withToggleBookmark from '../HOCs/ToggleBookmarkMutation';
import { GetContacts, GetTargets } from '../GraphQL/queries';
import ActionModal from './ActionModal';

let DELETE_MODAL_ID = "deleteModal";

const enhance = compose(
    withRouter,
    withContacts,
    withUpdateTarget,
    withDeleteTarget,
    withToggleBookmark,
    withFormData('target'),
    withIsSubmitting,
    withError,
    withValidationErrors,
    withState('editMode', 'setEditMode', ({ editMode }) => editMode),
    withHandlers({
        onSubmit: ({
            formData,
            setValidationErrors,
            setIsSubmitting,
            setEditMode,
            updateTarget,
            target
        }) => event => {
            event.preventDefault();
            // // validate however
            if (formData.name.length === 0) {
                return setValidationErrors({ name: 'Name is required' });
            }
            setValidationErrors({});
            setIsSubmitting(true);

            updateTarget({
                variables: {
                    input: {
                        ...formData,
                        id: undefined,
                        contacts: undefined,
                        isBookmarked: undefined,
                        __typename: undefined
                    },
                    id: target.id
                },
                refetchQueries: [{query: GetContacts}, {query: GetTargets}]
            }).then(({ data: { updateTarget } }) => {
                setIsSubmitting(false);
                setEditMode(false);
            })

        },
        handleDelete: ({
            history,
            target,
            deleteTarget
        }) => event => {
            event.preventDefault();
            deleteTarget({
                variables: {
                    id: target.id
                }
            }).then(({ data: { deleteTarget } }) => {
                if (deleteTarget) {
                    history.push('/targets');
                }
            })

        },
        handleBookmarkToggle: ({
            toggleBookmark,
            target
        }) => event => {
            event.preventDefault();
            toggleBookmark({
                variables: {
                    id: target.id,
                    type: "target"
                }
            });
        },
        handleRemoveContact: ({
            formData,
            setFormData
        }) => (event, contactId) => {
            event.preventDefault();
            event.stopPropagation();
            let contactIds = formData.contactIds.filter(id => id !== contactId);
            setFormData({...formData, contactIds});
        },
        handleAddContact: ({
            setFormData,
            formData
        }) => (event, contactId) => {
            event.preventDefault();
            let contactIds = formData.contactIds.concat(contactId);
            setFormData({ ...formData, contactIds });
        }
    })
);


const Target = ({
    target,
    handleDelete,
    editMode,
    error,
    errors,
    setEditMode,
    onSubmit,
    onChange,
    isSubmitting,
    setFormData,
    formData,
    handleBookmarkToggle,
    handleRemoveContact,
    handleAddContact,
    contactsLoading,
    contactsError,
    contactsData
}) => (
        <div className="w-75 bg-light ml-2 position-relative item" style={{ minHeight: "530px" }}>
            <div className="position-fixed w-100 m-2">
                <div className="pl-3 py-1 w-30">
                    <form onSubmit={onSubmit} className="pt-3">
                        <div className="h2 w-100 d-flex">
                            <TargetIcon className={"feather mr-2 text-primary align-self-center " + (editMode ? 'mb-3' : '')} />
                            {editMode ? (
                                <div className="form-group ">
                                    <input
                                        required
                                        readOnly={!editMode}
                                        value={formData.name}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        placeholder="Target Name"
                                        onChange={onChange} />
                                    {errors.name ? <div class="invalid-feedback">{errors.name}</div> : null}
                                </div>
                            ) : formData.name}
                            <a href="#" onClick={handleBookmarkToggle} className={`ml-auto mr-2 ${target.isBookmarked ? 'text-bookmark' : 'text-secondary'}`}  ><Bookmark className="feather" /></a>
                            <a href="#" onClick={() => setEditMode(true)} className="text-secondary mr-2"  ><Edit2 className="feather" /></a>
                            <a href="#" className="text-secondary" data-toggle="modal" data-target={"#" + DELETE_MODAL_ID}><Trash2 className="feather " /></a>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                required
                                disabled={!editMode}
                                value={formData.status}
                                type="text"
                                className="form-control"
                                name="status"
                                id="status"
                                placeholder="Status"
                                onChange={onChange}>
                                <option value="pending">Pending</option>
                                <option value="researching">Researching</option>
                                <option value="approved">Approved</option>
                                <option value="declined">Declined</option>
                            </select>
                            {errors.status ? <div class="invalid-feedback">{errors.status}</div> : null}
                        </div>
                        <div className="list-group list-group-flush w-100 mb-3">
                            {   
                                contactsLoading ? 'loading' : contactsError ? 'error'
                                : formData.contactIds.map(contactId=>(
                                    <NavLink exact to={`/contacts/${contactId}`} className="list-group-item list-group-item-action d-flex align-items-center" key={contactId}>
                                        <User className="feather mr-2" style={{ marginTop: "0.16rem" }} />
                                        <span>{contactsData.getContacts.find(({id})=>id===contactId).name}</span>
                                        <span className="ml-auto">{contactsData.getContacts.find(({ id }) => id === contactId).phone}</span>
                                        {editMode ?<button type="button" className="ml-2 close" aria-label="Close" onClick={(e)=>{handleRemoveContact(e, contactId)}}>
                                            <span aria-hidden="true">&times;</span>
                                        </button> : ''}
                                    </NavLink> 
                                ))
                            }            
                        </div>
                        {editMode ? (
                            <div className="form-group">
                                <div className="dropdown">
                                    <button className="btn btn-link dropdown-toggle" type="button" id="addContactButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Add Contact
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="addContactButton">
                                        {contactsData.getContacts.filter(contact=>!formData.contactIds.includes(contact.id)).map(contact => (
                                            <a key={contact.id} className="dropdown-item" onClick={e => handleAddContact(e, contact.id)} href="#">{contact.name}</a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {editMode ? (
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2">{isSubmitting ? "Saving..." : "Save Changes"}</button>
                                <button type="button" onClick={() => {
                                    setFormData(target);
                                    setEditMode(false);
                                }} className="btn btn-secondary">Cancel</button>
                            </div>
                        ) : null}
                        <div className="form-group">
                            {error ? <div className="invalid-feedback">{error}</div> : null}
                        </div>
                    </form>
                  
                </div>

            </div>
            <ActionModal
                modalId={DELETE_MODAL_ID}
                action={handleDelete}
                title={target.name}
                message="Are you sure you want to delete this target?"
                actionText="Delete" />
        </div>
    )

export default enhance(Target);