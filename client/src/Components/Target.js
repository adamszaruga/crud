import React from 'react';
import { Target as TargetIcon, Trash2, Edit2 } from 'react-feather';
import { compose, withHandlers, withState } from 'recompose';
import { withFormData, withIsSubmitting, withError, withValidationErrors } from '../HOCs/forms';
// import ActionModal from './ActionModal';

let DELETE_MODAL_ID = "deleteModal";

const Target = ({
    target,
    deleteTarget,
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
                            <a href="#" onClick={() => setEditMode(true)} className="text-secondary ml-auto mr-2"  ><Edit2 className="feather" /></a>
                            <a href="#" className="text-secondary" data-toggle="modal" data-target={"#" + DELETE_MODAL_ID}><Trash2 className="feather " /></a>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <input
                                required
                                readOnly={!editMode}
                                value={formData.status}
                                type="text"
                                className="form-control"
                                name="street"
                                id="street"
                                placeholder="Status"
                                onChange={onChange} />
                            {errors.status ? <div class="invalid-feedback">{errors.status}</div> : null}
                        </div>
                       
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
            {/* <ActionModal
                modalId={DELETE_MODAL_ID}
                action={() => deleteTarget(project)}
                title={project.name}
                message="Are you sure you want to delete this project?"
                actionText="Delete" /> */}
        </div>
    )

export default compose(
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
            setError,
            setFormData,
            setOutput,
            updateTarget,
            project
        }) => event => {
            // event.preventDefault();
            // // validate however
            // if (formData.name.length === 0) {
            //     return setValidationErrors({ name: 'Name is required' });
            // }
            // setValidationErrors({});

            // setIsSubmitting(true);

            // updateTarget(project, { ...formData }).then(() => {
            //     setEditMode(false);
            //     setIsSubmitting(false);
            //     setError(null);
            // });

        },
    })
)(Target);