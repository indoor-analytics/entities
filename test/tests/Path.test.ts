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

    it('should produce a clone that is independent from original value', () => {
        const originalName = "This is the path name";
        const p = new Path(originalName, []);
        const clone = p.clone();

        const newName = "New name";
        clone.name = newName;
        assert.strictEqual(p.name, originalName);
        assert.strictEqual(clone.name, newName);
    });

    it('should have a source id without providing id', () => {
        const p = new Path("pathname", []);
        assert.strictEqual(p.getSourceName(), 'path--1-pathname');
    })
});
