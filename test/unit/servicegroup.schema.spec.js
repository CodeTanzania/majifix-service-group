'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const ServiceGroup =
  require(path.join(__dirname, '..', '..', 'lib', 'servicegroup.model'));


describe('ServiceGroup', function () {

  describe('Schema', function () {

    it('should have jurisdiction field', function () {

      const jurisdiction = ServiceGroup.schema.tree.jurisdiction;
      const instance = ServiceGroup.schema.paths.jurisdiction.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.true;
      expect(jurisdiction.autoset).to.be.true;

    });

    it('should have code field', function () {

      const code = ServiceGroup.schema.tree.code;
      const instance = ServiceGroup.schema.paths.code.instance;

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

    describe('name', function () {

      it('should be an embedded sub-document', function () {
        const name = ServiceGroup.schema.tree.name;
        const instance = ServiceGroup.schema.paths.name.instance;
        const tree = ServiceGroup.schema.tree.name.tree;

        expect(instance).to.be.equal('Embedded');
        expect(name).to.exist;
        expect(name).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have type `en` locale field', function () {
        const instance = ServiceGroup.schema.paths.name.schema.paths.en.instance;
        const en = ServiceGroup.schema.tree.name.tree.en;

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

    describe('description', function () {
      it('should be an embedded sub-document', function () {
        const description = ServiceGroup.schema.tree.description;
        const instance = ServiceGroup.schema.paths.description.instance;
        const tree = ServiceGroup.schema.tree.description.tree;

        expect(instance).to.be.equal('Embedded');
        expect(description).to.exist;
        expect(description).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have type `en` locale field', function () {
        const instance = ServiceGroup.schema.paths.description.schema.paths.en.instance;
        const en = ServiceGroup.schema.tree.description.tree.en;

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

    it('should have color field', function () {

      const color = ServiceGroup.schema.tree.color;
      const instance = ServiceGroup.schema.paths.color.instance;

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