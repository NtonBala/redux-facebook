// Core
import { put, apply } from "redux-saga/effects";
// Helper that allows to test complex redux saga's scenarios (e.g. if clauses)
import { cloneableGenerator } from "redux-saga/utils";

// Instruments
import { api } from "../../../REST";
import { authActions } from "../../auth/actions";
import { uiActions } from "../../ui/actions";

// Saga
import { signup } from "../saga/workers";

const signupAction = authActions.signupAsync(__.userProfile);

const saga = cloneableGenerator(signup)(signupAction);
let clone = null;

describe("signup saga:", () => {
    describe("should pass until response received:", () => {
        test('should yield "put" effect dispatching "startFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });

        test('should yield "apply" effect making fetch request', () => {
            expect(saga.next().value).toEqual(
                apply(api, api.auth.signup, [__.userProfile])
            );

            clone = saga.clone();
        });
    });

    // Unsuccessful fetch request
    describe("should handle 400 status response", () => {
        test('should yield "apply" effect calling response.json method on 400 status response, returned by fetch request', () => {
            expect(clone.next(__.fetchResponseFail400).value).toEqual(
                apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            );
        });

        test('should yield "put" effect dispatching "emitError" action, with error (created from data returned by response.json) and worker name as arguments', () => {
            expect(clone.next(__.responseDataFail).value).toEqual(
                put(uiActions.emitError(__.error, "signup worker"))
            );
        });

        test('should yield "put" effect dispatching "stopFetching" action', () => {
            expect(clone.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(clone.next().done).toBe(true);
        });
    });

    // Successful fetch request
    describe("should handle 200 status response", () => {
        test('should yield "apply" effect calling response.json method on 200 status response, returned by fetch request', () => {
            expect(saga.next(__.fetchResponseSuccess).value).toEqual(
                apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
            );
        });

        test('should yield "apply" effect setting token (from returned by response.json data) to localStorage', () => {
            expect(saga.next(__.responseDataSuccess).value).toEqual(
                apply(localStorage, localStorage.setItem, ["token", __.token])
            );
        });

        test('should match snapshot of "put" effect, dispatching "fillProfile" action with __.userProfile as payload', () => {
            expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "payload": Object {
        "avatar": "TEST_AVATAR",
        "firstName": "Walter",
        "id": "TEST_ID",
        "lastName": "White",
        "token": "TEST_TOKEN",
      },
      "type": "FILL_PROFILE",
    },
    "channel": null,
  },
}
`);
        });

        test('should match snapshot of "put" effect, dispatching "change" rrfAction with __.userProfile.firstName as value', () => {
            expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "external": true,
      "model": "forms.user.profile.firstName",
      "multi": false,
      "silent": false,
      "type": "rrf/change",
      "value": "Walter",
    },
    "channel": null,
  },
}
`);
        });

        test('should match snapshot of "put" effect, dispatching "change" rrfAction with __.userProfile.lastName as value', () => {
            expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "external": true,
      "model": "forms.user.profile.lastName",
      "multi": false,
      "silent": false,
      "type": "rrf/change",
      "value": "White",
    },
    "channel": null,
  },
}
`);
        });

        test('should match snapshot of "put" effect, dispatching "authenticate" action', () => {
            expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "type": "AUTHENTICATE",
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
