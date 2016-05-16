/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the AppStore and passes the new data to its children.
 */

var React = require('react');
var Navtab = require('./Navtab.react.js');
var ContactModal = require('./ContactModal.react');
var EditContactModal = require('./EditContactModal.react');
var ContactList = require('./ContactList.react');
var AppStore = require('../stores/AppStore');
var AppAction = require('../actions/AppAction');

/**
 * Retrieve the current Contacts data from the AppStore
 */
function getContactsState() {
  return {
    allContacts: AppStore.getAll(),
    editContact: AppStore.getEditContact()
  };
}

var App = React.createClass({
  getInitialState: function() {
    // loading existing data
    this._initializeContacts();
    return getContactsState();
  },
  componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },
	render: function() {
    // request to edit a specific contact from store
    var editId = this.state.editContact.id;
    var editContact = this.state.editContact;
    if (editId !== undefined) {
      $('#edit_contact_modal').openModal();

      // fill form elements with selected contact info
      $('#edit_contact_form').find('#contact_id').val(editContact.id);
      $('#edit_contact_form').find('#contact_name').val(editContact.name);
      $('#edit_contact_form').find('#contact_phone').val(editContact.phone);
      $('#edit_contact_form').find('#contact_email').val(editContact.email);
      $('#edit_contact_form').find('#contact_avatar').val(editContact.avatar);

      // focus on the first field with a little delay so it won't mess-
      // with modal focus
      setTimeout(function() {
        $('#edit_contact_form').find('#contact_name').focus();
      },50);
      

      // changing back to undefined so it prevent from opening the modal-
      // everytime the view is rendering
      this.state.editContact.id = undefined;
    }
    // main block
    return(
      <ul className="collection">
        <Navtab/>
        <ContactList data={this.state.allContacts}/>
        <ContactModal />
        <EditContactModal editContact={this.state.editContact} />
      </ul>

    );
  },
  /**
  * Event handler for 'change' events coming from the AppStore
  */
  _onChange: function() {
    this.setState(getContactsState());

  },
  _initializeContacts: function() {
    // loading imaginary contacts
    // can also be loaded from a remote server
    var contacts = [
            {
              id: 1,
              name : 'Avinash Reddy',
              phone: '651-603-1723',
              email: 'Avinashreddy@gmail.com'
            },
            {
              id: 2,
              name : 'Charlie Haarper',
              phone: '918-774-0199',
              email: 'CharlieHarper@Hotmail.com'
            },
            {
              id: 3,
              name : 'Chris Morris',
              phone: '513-807-6759',
              email: 'Chrismorris@gmail.com'
            },
            {
              id: 4,
              name : 'John Doe',
              phone: '318-292-6700',
              email: 'JohnDoe@gmail.com'
            },
            {
              id: 5,
              name : 'Rajesh Kuthrapali',
              phone: '803-557-9815',
              email: 'RajeshKuthrapali@BBTheory.com'
            },
            {
              id: 6,
              name : 'Sheldon Cooper',
              phone: '702-989-5145',
              email: 'Scooper@Friends.com'
            }
          ];

        // looping through loaded contacts to create them individually
        // sending action
        contacts.forEach(function(obj) {
        	AppAction.create(obj);
        });
  }

});

module.exports = App;