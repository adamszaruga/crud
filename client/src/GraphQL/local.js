import gql from "graphql-tag";
import { compose } from 'react-apollo';
import { GetContacts, GetTargets } from './queries';
export const defaults = {

}

export const resolvers = {
    Contact: {
        isBookmarked: ({id}, variables, {cache}) => {
            const bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];

            let bookmark = bookmarks.find(bookmark => {
                return bookmark.id === id && bookmark.type === "contact"
            })

            return bookmark ? true : false
        }
    },
    Target: {
        isBookmarked: ({ id }, variables, { cache }) => {
            const bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];

            let bookmark = bookmarks.find(bookmark => {
                return bookmark.id === id && bookmark.type === "target"
            })

            return bookmark ? true : false
        }
    },
    Mutation: {
        toggleBookmark(_, {id, type}, { cache, getCacheKey }) {
            const bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
            let bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id === id && bookmark.type === type);
            if (bookmarkIndex > -1) {
                bookmarks.splice(bookmarkIndex, 1);
            } else {
                bookmarks.push({ id, type });
            }
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

            return {id, type}
        },
    },
}

export const typeDefs = {

}