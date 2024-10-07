**_User_**

    This is the core entity and many other entities depend on it.

**_UserPreferences_**

    Closely related to User and can be implemented right after.

**_UserMedication_**

    The main entity for storing medication information.

**_MedicationSchedule_**

    Depends on UserMedication.

**_DoseLog_**

    Tracks medication intake, depends on UserMedication.

**_Reminder_**

    For medication reminders, depends on UserMedication.

**_MedicationInventory_**

    Tracks medication supply, depends on UserMedication.

**_MedicationCost_**

    Stores cost information, depends on UserMedication.

**_RefillReminder_**

    For refill reminders, depends on UserMedication.

**_SideEffect_**

    Stand-alone entity for storing side effect information.

**_UserSideEffectLog_**

    Logs user-reported side effects, depends on UserMedication and SideEffect.

**_EmergencyContact_**

    Stores emergency contact information, depends on User.
