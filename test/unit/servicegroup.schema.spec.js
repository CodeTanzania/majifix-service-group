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

    it('should have name field', function () {

      const name = ServiceGroup.schema.tree.name;
      const instance = ServiceGroup.schema.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.required).to.be.true;
      expect(name.trim).to.be.true;
      expect(name.index).to.be.true;
      expect(name.searchable).to.be.true;

    });


    it('should have description field', function () {

      const description = ServiceGroup.schema.tree.description;
      const instance = ServiceGroup.schema.paths.description.instance;

      expect(instance).to.be.equal('String');
      expect(description).to.exist;
      expect(description).to.be.an('object');
      expect(description.type).to.be.a('function');
      expect(description.type.name).to.be.equal('String');
      expect(description.trim).to.be.true;
      expect(description.searchable).to.be.true;
      expect(description.index).to.be.true;

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