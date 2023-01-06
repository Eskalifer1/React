import { addPost, profileReducer } from "../profileReducer";
import '@testing-library/jest-dom/extend-expect'

test('new Post Should be added', () => {
    let action = addPost('Hello')
    let initialState = {
        postData: [
            { id: 1, message: 'Hi', likesCount: 5 },
            { id: 2, message: 'How are you?', likesCount: 12 }
        ]
    }
    let newState = profileReducer(initialState, action);
    expect(newState.postData.length).toBe(3);
  });