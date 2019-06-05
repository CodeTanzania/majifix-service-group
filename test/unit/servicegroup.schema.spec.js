/* dependencies */
import { expect } from 'chai';

/* declarations */
import ServiceGroup from '../../src/servicegroup.model';

describe('ServiceGroup', () => {
  describe('Schema', () => {
    it('should have jurisdiction field', () => {
      const { jurisdiction } = ServiceGroup.schema.tree;
      const { instance } = ServiceGroup.schema.paths.jurisdiction;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.true;
    });

    it('should have priority field', () => {
      const { priority } = ServiceGroup.schema.tree;
      const { instance } = ServiceGroup.schema.paths.priority;

      expect(instance).to.be.equal('ObjectID');
      expect(priority).to.exist;
      expect(priority).to.be.an('object');
      expect(priority.type).to.be.a('function');
      expect(priority.type.name).to.be.equal('ObjectId');
      expect(priority.index).to.be.true;
      expect(priority.exists).to.be.true;
    });

    it('should have code field', () => {
      const { code } = ServiceGroup.schema.tree;
      const { instance } = ServiceGroup.schema.paths.code;

      expect(instance).to.be.equal('String');
      expect(code).to.exist;
      expect(code).to.be.an('object');
      expect(code.type).to.be.a('function');
      expect(code.type.name).to.be.equal('String');
      expect(code.required).to.be.true;
      expect(code.uppercase).to.be.true;
      expect(code.trim).to.be.true;
      expect(code.index).to.be.true;
      expect(code.searchable).to.be.true;
    });

    describe('name', () => {
      it('should be an embedded sub-document', () => {
        const { name } = ServiceGroup.schema.tree;
        const { instance } = ServiceGroup.schema.paths.name;
        const { tree } = ServiceGroup.schema.tree.name;

        expect(instance).to.be.equal('Embedded');
        expect(name).to.exist;
        expect(name).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have type `en` locale field', () => {
        const { instance } = ServiceGroup.schema.paths.name.schema.paths.en;
        const { en } = ServiceGroup.schema.tree.name.tree;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.required).to.be.true;
        expect(en.searchable).to.be.true;
      });
    });

    describe('description', () => {
      it('should be an embedded sub-document', () => {
        const { description } = ServiceGroup.schema.tree;
        const { instance } = ServiceGroup.schema.paths.description;
        const { tree } = ServiceGroup.schema.tree.description;

        expect(instance).to.be.equal('Embedded');
        expect(description).to.exist;
        expect(description).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have type `en` locale field', () => {
        const {
          instance,
        } = ServiceGroup.schema.paths.description.schema.paths.en;
        const { en } = ServiceGroup.schema.tree.description.tree;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.searchable).to.be.true;
      });
    });

    it('should have color field', () => {
      const { color } = ServiceGroup.schema.tree;
      const { instance } = ServiceGroup.schema.paths.color;

      expect(instance).to.be.equal('String');
      expect(color).to.exist;
      expect(color).to.be.an('object');
      expect(color.type).to.be.a('function');
      expect(color.type.name).to.be.equal('String');
      expect(color.trim).to.be.true;
      expect(color.default).to.be.exist;
    });
  });
});
