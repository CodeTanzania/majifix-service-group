import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import ServiceGroup from '../../src/servicegroup.model';

describe('ServiceGroup Schema', () => {
  it('should have jurisdiction field', () => {
    const group = ServiceGroup.path('jurisdiction');

    expect(group).to.exist;
    expect(group).to.be.instanceof(SchemaTypes.ObjectID);
    expect(group.options).to.exist;
    expect(group.options).to.be.an('object');
    expect(group.options.type).to.be.a('function');
    expect(group.options.type.name).to.be.equal('ObjectId');
    expect(group.options.ref).to.exist.and.be.equal('Jurisdiction');
    expect(group.options.exists).to.exist.and.be.an('object');
    expect(group.options.autopopulate).to.exist.and.an('object');
    expect(group.options.index).to.be.true;
  });

  it('should have priority field', () => {
    const group = ServiceGroup.path('priority');

    expect(group).to.exist;
    expect(group).to.be.instanceof(SchemaTypes.ObjectID);
    expect(group.options).to.exist;
    expect(group.options).to.be.an('object');
    expect(group.options.type).to.be.a('function');
    expect(group.options.type.name).to.be.equal('ObjectId');
    expect(group.options.ref).to.exist.and.be.equal('Priority');
    expect(group.options.exists).to.exist.and.be.an('object');
    expect(group.options.autopopulate).to.exist.and.an('object');
    expect(group.options.index).to.be.true;
  });

  it('should have code field', () => {
    const code = ServiceGroup.path('code');

    expect(code).to.exist;
    expect(code).to.be.instanceof(SchemaTypes.String);
    expect(code.options).to.exist;
    expect(code.options).to.be.an('object');
    expect(code.options.type).to.exist;
    expect(code.options.trim).to.be.true;
    expect(code.options.index).to.be.true;
    expect(code.options.searchable).to.be.true;
    expect(code.options.exportable).to.be.true;
    expect(code.options.fake).to.exist;
  });

  it('should have name field', () => {
    const name = ServiceGroup.path('name');
    const en = ServiceGroup.path('name.en');
    const sw = ServiceGroup.path('name.sw');

    expect(name).to.exist;

    expect(en).to.exist;
    expect(en).to.be.instanceof(SchemaTypes.String);
    expect(en.options).to.exist;
    expect(en.options).to.be.an('object');
    expect(en.options.type).to.exist;
    expect(en.options.trim).to.be.true;
    expect(en.options.required).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.taggable).to.be.true;
    expect(en.options.exportable).to.be.true;
    expect(en.options.fake).to.exist;

    expect(sw).to.exist;
    expect(sw).to.be.instanceof(SchemaTypes.String);
    expect(sw.options).to.exist;
    expect(sw.options).to.be.an('object');
    expect(sw.options.type).to.exist;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.required).to.be.false;
    expect(sw.options.index).to.be.true;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.taggable).to.be.true;
    expect(sw.options.exportable).to.be.true;
    expect(sw.options.fake).to.exist;
  });

  it('should have description field', () => {
    const description = ServiceGroup.path('description');
    const en = ServiceGroup.path('description.en');
    const sw = ServiceGroup.path('description.sw');

    expect(description).to.exist;

    expect(en).to.exist;
    expect(en).to.be.instanceof(SchemaTypes.String);
    expect(en.options).to.exist;
    expect(en.options).to.be.an('object');
    expect(en.options.type).to.exist;
    expect(en.options.trim).to.be.true;
    expect(en.options.required).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.exportable).to.be.true;
    expect(en.options.fake).to.exist;

    expect(sw).to.exist;
    expect(sw).to.be.instanceof(SchemaTypes.String);
    expect(sw.options).to.exist;
    expect(sw.options).to.be.an('object');
    expect(sw.options.type).to.exist;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.required).to.be.false;
    expect(sw.options.index).to.be.true;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.exportable).to.be.true;
    expect(sw.options.fake).to.exist;
  });

  it('should have color field', () => {
    const color = ServiceGroup.path('color');

    expect(color).to.exist;
    expect(color).to.be.instanceof(SchemaTypes.String);
    expect(color.options).to.exist;
    expect(color.options).to.be.an('object');
    expect(color.options.type).to.exist;
    expect(color.options.trim).to.be.true;
    expect(color.options.uppercase).to.be.true;
    expect(color.options.exportable).to.be.true;
    expect(color.options.fake).to.exist;
  });

  it('should have default field', () => {
    const isDefault = ServiceGroup.path('default');

    expect(isDefault).to.exist;
    expect(isDefault).to.be.instanceof(SchemaTypes.Boolean);
    expect(isDefault.options).to.exist;
    expect(isDefault.options).to.be.an('object');
    expect(isDefault.options.type).to.exist;
    expect(isDefault.options.index).to.be.true;
    expect(isDefault.options.exportable).to.be.true;
    expect(isDefault.options.default).to.be.false;
    expect(isDefault.options.fake).to.exist;
  });
});
