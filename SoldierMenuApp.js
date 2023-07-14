class Soldier {
    constructor(lastName, firstName, branchOfService, yearsOfService, rankAtSeparation) {
        this.lastName = lastName; // Store the soldier's last name
        this.firstName = firstName; // Store the soldier's first name
        this.branchOfService = branchOfService; // Store the soldier's branch of service
        this.yearsOfService = yearsOfService; // Store the soldier's years of service
        this.rankAtSeparation = rankAtSeparation; // Store the soldier's rank at separation
    }

    describe() {
        return `${this.lastName}, ${this.firstName}\nBranch of Service: ${this.branchOfService}\nYears of Service: ${this.yearsOfService}\nRank at Separation: ${this.rankAtSeparation}`;
        // Return a description of the soldier's last name, first name, branch of service, years of service, and rank at separation
    }
}

class Unit {
    constructor(name) {
        this.name = name; // Store the unit's name
        this.soldiers = []; // Initialize an empty array to store the soldiers in the unit
    }

    addSoldier(soldier) {
        // Check if the soldier argument is an instance of Soldier class
        if (soldier instanceof Soldier) {
            this.soldiers.push(soldier); // Add the soldier to the unit's soldiers array
        } else {
            throw new Error(`You can only add an instance of Soldier. Argument is not a soldier: ${soldier}`);
        }
    }

    describe() {
        return `${this.name} unit has ${this.soldiers.length} soldiers.`;
        // Return a description of the unit's name and the number of soldiers in the unit
    }
}

class Barracks {
    constructor() {
        this.units = []; // Initialize an empty array to store the units
        this.selectedUnit = null; // Initialize the selected unit as null
    }

    start() {
        let selection = this.showMainMenuOptions(); // Get the user's initial selection from the main menu

        while (selection != 0) { // Continue looping until the user selects "Exit"
            switch (selection) {
                case '1':
                    this.createUnit(); // Call the method to create a new unit
                    break;
                case '2':
                    this.viewUnit(); // Call the method to view a unit's details
                    break;
                case '3':
                    this.deleteUnit(); // Call the method to delete a unit
                    break;
                case '4':
                    this.displayUnits(); // Call the method to display all units
                    break;
                default:
                    selection = 0; // If the user enters an invalid selection, set selection to 0 to exit the loop
            }
            selection = this.showMainMenuOptions(); // Get the user's next selection from the main menu
        }

        alert('Dismissed!'); // Display a dismissal message when the barracks loop ends
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create new unit
        2) View unit
        3) Delete unit
        4) Display all units
        `); // Display the main menu options and prompt the user for a selection
    }

    showUnitMenuOptions(unitInfo) {
        return prompt(`
        0) Back
        1) Add soldier
        2) Remove soldier
        __________________________
        ${unitInfo}
        `); // Display the unit menu options along with the unit information and prompt the user for a selection
    }

    displayUnits() {
        let unitString = '';
        for (let i = 0; i < this.units.length; i++) {
            unitString += i + ') ' + this.units[i].name + '\n';
        }
        alert(unitString);
        // Build a string with the index and name of each unit and display it
    }

    createUnit() {
        let name = prompt(`Enter the name for the new unit:`); // Prompt the user to enter a name for the new unit
        this.units.push(new Unit(name)); // Create a new Unit instance with the provided name and add it to the units array
    }

    viewUnit() {
        let index = prompt(`Enter the index of the unit you wish to view:`); // Prompt the user to enter the index of the unit to view
        if (index > -1 && index < this.units.length) {
            this.selectedUnit = this.units[index]; // Set the selected unit to the unit at the specified index
            let description = 'Unit Name: ' + this.selectedUnit.name + '\n'; // Create a description string with the selected unit's name

            for (let i = 0; i < this.selectedUnit.soldiers.length; i++) {
                description += i + ') ' + this.selectedUnit.soldiers[i].lastName + ', ' +
                    this.selectedUnit.soldiers[i].firstName + '\n' +
                    'Branch of Service: ' + this.selectedUnit.soldiers[i].branchOfService + '\n' +
                    'Years of Service: ' + this.selectedUnit.soldiers[i].yearsOfService + '\n' +
                    'Rank at Separation: ' + this.selectedUnit.soldiers[i].rankAtSeparation + '\n';
                // Append each soldier's last name, first name, branch of service, years of service, and rank at separation to the description string
            }

            let selection = this.showUnitMenuOptions(description); // Show the unit menu options with the unit information and prompt for a selection
            switch (selection) {
                case '1':
                    this.addSoldier(); // Call the method to add a soldier to the unit
                    break;
                case '2':
                    this.removeSoldier(); // Call the method to remove a soldier from the unit
                    break;
            }
        }
    }

    deleteUnit() {
        let index = prompt('Enter the index of the unit you wish to delete'); // Prompt the user to enter the index of the unit to delete
        if (index > -1 && index < this.units.length) {
            this.units.splice(index, 1); // Remove the unit at the specified index from the units array
        }
    }

    addSoldier() {
        let lastName = prompt('Enter the last name of the new soldier:'); // Prompt the user to enter the last name of the new soldier
        let firstName = prompt('Enter the first name of the new soldier:'); // Prompt the user to enter the first name of the new soldier
        let branchOfService = prompt('Enter the branch of service for the new soldier:'); // Prompt the user to enter the branch of service for the new soldier
        let yearsOfService = prompt('Enter the years of service for the new soldier:'); // Prompt the user to enter the years of service for the new soldier
        let rankAtSeparation = prompt('Enter the rank at separation for the new soldier:'); // Prompt the user to enter the rank at separation for the new soldier
        this.selectedUnit.soldiers.push(new Soldier(lastName, firstName, branchOfService, yearsOfService, rankAtSeparation));
    }
        // Create a new Soldier
}

let baracks = new Barracks();
baracks.start();