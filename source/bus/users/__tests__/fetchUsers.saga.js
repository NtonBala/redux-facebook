// Core
import { apply } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { api } from '../../../REST';

// Saga
import { fetchUsers } from '../saga/workers';

const saga = cloneableGenerator(fetchUsers)();
let clone = null;

describe("fetchUsers saga:", () => {
    describe("should pass until response received:", () => {
        test('should match snapshot of "put" effect dispatching "startFetching" action', () => {
            expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "type": "START_FETCHING",
    },
    "channel": null,
  },
}
`);
        });

        test('should yield "apply" effect making fetch request', () => {
            expect(saga.next().value).toEqual(apply(api, api.users.fetch));

            clone = saga.clone();
        });
    });

    describe("should handle 400 status response", () => {
        test('should yield "apply" effect calling response.json method on 400 status response, returned by fetch request', () => {
            expect(clone.next(__.fetchResponseFail400).value).toEqual(
                apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            );
        });

        test('should match snapshot of "put" effect dispatching "emitError" action with __.error as payload, and worker name as meta', () => {
            expect(clone.next(__.responseDataFail).value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "error": true,
      "meta": "fetchUsers worker",
      "payload": [Error: TEST_ERROR_MESSAGE.],
      "type": "EMIT_ERROR",
    },
    "channel": null,
  },
}
`);
        });

        test('should match snapshot of "put" effect dispatching "stopFetching" action', () => {
            expect(clone.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "type": "STOP_FETCHING",
    },
    "channel": null,
  },
}
`);
        });

        test("should finish", () => {
            expect(clone.next().done).toBe(true);
        });
    });

    describe("should handle 200 status response", () => {
        test('should yield "apply" effect calling response.json method on 200 status response, returned by fetch request', () => {
            expect(saga.next(__.fetchResponseSuccess).value).toEqual(
                apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
            );
        });

        test('should match snapshot of "put" effect, dispatching "fillUsers" action with __.users as payload', () => {
            expect(saga.next(__.responseUsersDataSuccess).value)
                .toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "payload": Array [
        Object {
          "avatar": "TEST_AVATAR",
          "firstName": "Walter",
          "id": "TEST_ID",
          "lastName": "White",
        },
      ],
      "type": "FILL_USERS",
    },
    "channel": null,
  },
}
`);
        });

        test('should match snapshot of "put" effect dispatching "stopFetching" action', () => {
            expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "type": "STOP_FETCHING",
    },
    "channel": null,
  },
}
`);
        });

        test("should finish", () => {
            expect(saga.next().done).toBe(true);
        });
    });

});
