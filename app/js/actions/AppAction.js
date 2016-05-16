
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppAction = {

  /**
   * Saving new contact
   * @param {string} new contact object
   */
  create: function(newContact) {
  	// adding avatar randomly!
  	var avatar = 'img/faces/' + Math.floor(Math.random() * (3-1) + 1) + '.jpg';
  	newContact.avatar = avatar;

    AppDispatcher.dispatch({
      actionType: AppConstants.CM_CREATE,
      name: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      avatar: newContact.avatar
    });
  },
  /**
   * Opening modal to edit contact
   */
  edit: function(contact) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CM_EDIT,
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      avatar: contact.avatar
    });
  },
  /**
   * Saving edited contact
   */
  save: function(contact) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CM_SAVE,
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      avatar: contact.avatar
    });
  },

  /**
   * removing contact
   */
  remove: function(removeId) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CM_REMOVE,
      id: removeId
    });
  }

};

module.exports = AppAction;
