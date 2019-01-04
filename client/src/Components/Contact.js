import React from 'react';
import { User, Trash2, Edit2 } from 'react-feather';
import { compose, withHandlers, withState } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFormData, withIsSubmitting, withError, withValidationErrors } from '../HOCs/forms';
import withUpdateContact from '../HOCs/UpdateContactMutation';
import withDeleteContact from '../HOCs/DeleteContactMutation';
import ActionModal from './ActionModal';

let DELETE_MODAL_ID = "deleteModal";

const enhance = compose(
    withRouter,
    withUpdateContact,
    withDeleteContact,
    withFormData('contact'),
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
            contact,
            updateContact,
        }) => event => {
            event.preventDefault();
            if (formData.name.length === 0) {
                return setValidationErrors({ name: 'Name is required' });
            }
            setValidationErrors({});
            setIsSubmitting(true);

            updateContact({
                variables: {
                    input: {
                        ...formData,
                        id: undefined,
                        target: undefined,
                        __typename: undefined,
                        targetId: formData.target ? formData.target.id : undefined
                    },
                    id: contact.id
                }
            }).then(({ data: { updateContact } })=>{
                setIsSubmitting(false);
                setEditMode(false);
            })

        },
        handleDelete: ({
            history,
            contact,
            deleteContact,
        }) => event => {
            event.preventDefault();
            deleteContact({
                variables: {
                    id: contact.id
                }
            }).then(({ data: { deleteContact } }) => {
                if (deleteContact) {
                    history.push('/contacts');
                }
            })

        },
    })
);


const Contact = ({
    contact,
    handleDelete,
    editMode,
    error,
    errors,
    setEditMode,
    onSubmit,
    onChange,
    isSubmitting,
    setFormData,
    formData
}) => (
        <div className="w-75 bg-light ml-2 position-relative item" style={{ minHeight: "530px" }}>
            <div className="position-fixed w-100 m-2">
                <div className="pl-3 py-1 w-30">
                    <form onSubmit={onSubmit} className="pt-3">
                        <div className="h2 w-100 d-flex">
                            <User className={"feather mr-2 text-primary align-self-center " + (editMode ? 'mb-3' : '')} />
                            {editMode ? (
                                <div className="form-group ">
                                    <input
                                        required
                                        readOnly={!editMode}
                                        value={formData.name || ''}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        placeholder="Contact Name"
                                        onChange={onChange} />
                                    {errors.name ? <div class="invalid-feedback">{errors.name}</div> : null}
                                </div>
                            ) : formData.name}
                            <a href="#" onClick={() => setEditMode(true)} className="text-secondary ml-auto mr-2"  ><Edit2 className="feather" /></a>
                            <a href="#" className="text-secondary" data-toggle="modal" data-target={"#" + DELETE_MODAL_ID}><Trash2 className="feather " /></a>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                required
                                readOnly={!editMode}
                                value={formData.title || ''}
                                type="text"
                                className="form-control"
                                name="title"
                                id="title"
                                placeholder="Title"
                                onChange={onChange} />
                            {errors.title ? <div class="invalid-feedback">{errors.title}</div> : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                required
                                readOnly={!editMode}
                                value={formData.phone || ''}
                                type="text"
                                className="form-control"
                                name="phone"
                                id="phone"
                                placeholder="Phone"
                                onChange={onChange} />
                            {errors.phone ? <div class="invalid-feedback">{errors.phone}</div> : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                required
                                readOnly={!editMode}
                                value={formData.email || ''}
                                type="text"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange} />
                            {errors.email ? <div class="invalid-feedback">{errors.email}</div> : null}
                        </div>

                        {editMode ? (
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2">{isSubmitting ? "Saving..." : "Save Changes"}</button>
                                <button type="button" onClick={() => {
                                    setFormData(contact);
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
                title={contact.name}
                message="Are you sure you want to delete this contact?"
                actionText="Delete" />
        </div>
    )


export default enhance(Contact);
