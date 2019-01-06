import React from 'react';
import { Mutation } from "react-apollo";
import { ToggleBookmark } from '../GraphQL/mutations';
import { GetTargets, GetContacts } from '../GraphQL/queries';

export default (WrappedComponent) => {
    return (props) => (
        <Mutation
            mutation={ToggleBookmark}
            update={(cache, { data }) => {
                let {id, type} = data.toggleBookmark
                if (type === "contact") {
                    const { getContacts } = cache.readQuery({ query: GetContacts });
                    cache.writeQuery({
                        query: GetContacts,
                        data: {
                            getContacts: getContacts.map(contact => {
                                if (contact.id === id) return { ...contact, isBookmarked: !contact.isBookmarked }
                                return contact;
                            })
                        }
                    })
                } else {
                    const { getTargets } = cache.readQuery({ query: GetTargets });
                    cache.writeQuery({
                        query: GetTargets,
                        data: {
                            getTargets: getTargets.map(target => {
                                if (target.id === id) return { ...target, isBookmarked: !target.isBookmarked }
                                return target;
                            })
                        }
                    })
                }
            }}
        >
            {(toggleBookmark, { loading, error, data }) => {
                return <WrappedComponent toggleBookmarkLoading={loading} toggleBookmarkError={error} toggleBookmarkData={data} toggleBookmark={toggleBookmark} {...props} />;
            }}
        </Mutation>
    )
}