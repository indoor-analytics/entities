import assert from "assert";
import Path from "../../src/Path";

describe('Path entity tests', () => {
    it('should create path with no positions', () => {
        const p = new Path("test path", []);
        assert.strictEqual(p.distance, 0);
        assert.strictEqual(p.toCoordinates().length, 0);
    });

    it('should not build a LineString for a path with no positions', () => {
        const p = new Path("test path", []);
        assert.throws(
            () => p.toLineString(),
            RangeError
        );
    });
});
