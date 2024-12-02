import React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileSection from '../components/ProfileSection';
import './ProfilePage.css';

const ProfilePage = () => {
  const handleSave = (data) => {
    console.log('Saved data:', data);
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <ProfileHeader />

      <ProfileSection
        title="Personal Info"
        subtitle="Update your photo and personal info here."
        sectionType="personal" 
        uploadEnabled={true}
        fields={[
          { label: 'First Name', name: 'firstName', type: 'text', defaultValue: 'Tom' },
          { label: 'Last Name', name: 'lastName', type: 'text', defaultValue: 'Smith' },
          { label: 'Email', name: 'email', type: 'email', defaultValue: 'uadfrzgersaatsoops@kvhrw.com' },
          { label: 'Username', name: 'username', type: 'text', defaultValue: 'Testnineteen' },
          { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'], defaultValue: 'Male' },
          { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', defaultValue: '1980-02-20' },
        ]}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <ProfileSection
        title="Contact Info"
        subtitle="Update your contact information here."
        sectionType="contact"
        fields={[
          { label: 'Country', name: 'country', type: 'select', options: ['United States', 'Canada', 'UK'], defaultValue: 'United States' },
          { label: 'City', name: 'city', type: 'text', defaultValue: 'Dallas' },
          { label: 'Province', name: 'province', type: 'text', defaultValue: 'Texas' },
          { label: 'Postcode', name: 'postcode', type: 'text', defaultValue: '75201' },
          { label: 'Address Line 1', name: 'address1', type: 'text', defaultValue: '123 Main St' },
          { label: 'Address Line 2', name: 'address2', type: 'text', defaultValue: 'Suite 100' },
          { label: 'Phone Number', name: 'phone', type: 'text', defaultValue: '(123) 456-7890' },
        ]}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <ProfileSection
        title="Company Info"
        subtitle="Update your company information here."
        sectionType="company"
        uploadEnabled={true}
        fields={[
          { label: 'Company Name', name: 'companyName', type: 'text', defaultValue: 'Tech Solutions' },
          { label: 'On Campus', name: 'onCampus', type: 'select', options: ['Yes', 'No'], defaultValue: 'Yes' },
        ]}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ProfilePage;
