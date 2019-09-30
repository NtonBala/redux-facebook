// Actions
import { uiActions } from "../actions";

describe("ui actions:", () => {
    test("startFetching", () => {
        expect(uiActions.startFetching()).toMatchInlineSnapshot(`
Object {
  "type": "START_FETCHING",
}
`);
    });

    test("stopFetching", () => {
        expect(uiActions.stopFetching()).toMatchInlineSnapshot(`
Object {
  "type": "STOP_FETCHING",
}
`);
    });

    test("emitError", () => {
        expect(uiActions.emitError(__.error)).toMatchInlineSnapshot(`
Object {
  "error": true,
  "meta": null,
  "payload": [Error: TEST_ERROR_MESSAGE.],
  "type": "EMIT_ERROR",
}
`);

        expect(uiActions.emitError(__.error, __.meta)).toMatchInlineSnapshot(`
Object {
  "error": true,
  "meta": Object {
    "action": "TEST_ACTION",
  },
  "payload": [Error: TEST_ERROR_MESSAGE.],
  "type": "EMIT_ERROR",
}
`);
    });

    test("setOnlineState", () => {
        expect(uiActions.setOnlineState()).toMatchInlineSnapshot(`
Object {
  "type": "SET_ONLINE_STATE",
}
`);
    });

    test("setOfflineState", () => {
        expect(uiActions.setOfflineState()).toMatchInlineSnapshot(`
Object {
  "type": "SET_OFFLINE_STATE",
}
`);
    });
});
