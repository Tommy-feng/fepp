/**
 * Created by zheqi on 2016/1/22.
 */
'use strict';

var mongoose        = require('mongoose'),
    findOrCreate    = require('mongoose-findOrCreate'),
    bcrypt          = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    fullname:       {type: String},
    email:          {type: String},
    password:       {type: String},
    emailConfirm:   Boolean,
    emailKey:       String,
    sessioncache:   String
});

userSchema.method.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.method.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(findOrCreate);

mongoose.model('User', userSchema);
