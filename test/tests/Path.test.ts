import {Path} from "../../index";
import assert from "assert";

describe('Path entity tests', () => {
    it('should create path with no positions', () => {
        const p = new Path("test path", []);
        assert.strictEqual(p.distance, 0);
        assert.strictEqual(p.toCoordinates().length, 0);
    });
});
