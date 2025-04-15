#include <iostream>
#include <conio.h> // using for getch function
#include <windows.h> // using Sleep function and console API
#include <fstream> // using for file handling

using namespace std;
void SetColor(int textColor, int bgColor = 0) {
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(hConsole, (bgColor << 4) | textColor);
}

class banking {
    int completed;
    string id;
    struct customer {
        string ID, phone, name, fname, address, idcard;
        int cash;
    } customer[100]; // for access str member
public:
    banking() {
        completed = 0;
    }
public:
    void options();
    void newaccount();
    void display();
    void update();
    void search();
    void transaction();
    void logout();
};

bool checkIfUserExists(const string& username, int& pin) {
    fstream loginFile;
    loginFile.open("LOGIN DETAIL.txt", ios::in);
    if (loginFile.is_open()) {
        string fileUname;
        int filePin;
        while (loginFile >> fileUname >> filePin) {
            if (username == fileUname) {
                pin = filePin; // Set the pin if user is found
                loginFile.close();
                return true;
            }
        }
        loginFile.close();
    }
    return false;
}

int main() {
    string Uname;
    int pin, pin1;
    fstream loginFile;

    // Set header color
    SetColor(10, 0);
    cout << "\t\t\t\t\t\t*     Bank Management System    *\n";
    SetColor(15, 0);
    cout << "\t\t\t\t\t\t_______________________________________\n\n\n";

    char choice;
    SetColor(10, 0); // Green text
    cout << "\n\n\t\t\t\t\t\tWelcome to Our Bank!\n\n";
    SetColor(15, 0); // Reset to white text
    SetColor(9, 0);
    cout << "\t\t\t\t\t\tPress 1 to Login \n";
    cout << "\t\t\t\t\t\tPress 2 to Signup \n";
    SetColor(12, 0);
    cout << "\t\t\t\t\t\tPress 3 to Exit \n"; // Added Exit Option
    SetColor(15, 0);
    choice = getch(); // Getting user choice

    if (choice == '1') {
        // Login
        SetColor(14, 0); // Yellow text
        cout << "\n\n\t\t\t\t\t\tEnter Your Username \n\n";
        SetColor(15, 0); // Reset to white text
        cout << " Username: ";
        cin >> Uname;

        if (checkIfUserExists(Uname, pin)) {
            SetColor(10, 0); // Green text
            cout << "\n\n\t\t\t\t\t\tWelcome back, " << Uname << "!\n";
        } else {
            SetColor(12, 0); // Red text
            cout << "\nUser not found! Please sign up first.";
            SetColor(15, 0); // Reset to white text
            return 0; // Exit if user doesn't exist
        }
    } else if (choice == '2') {
        // Signup
        SetColor(14, 0); // Yellow text
        cout << "\n\n\t\t\t\t\t\tSign Up Here \n\n";
        SetColor(15, 0); // Reset to white text
        cout << " Enter Your Username: ";
        cin >> Uname;
        cout << " Enter Your 4 Digit Pin: ";
        cin >> pin;

        // Writing login details to the file
        loginFile.open("LOGIN DETAIL.txt", ios::app); // Append to file
        if (loginFile.is_open()) {
            loginFile << Uname << " " << pin << endl;
            loginFile.close();
            SetColor(10, 0); // Green text
            cout << "\nYour Account is Being Created. Please Wait!! ";
            for (int i = 0; i < 2; i++) {
                cout << ".";
                Sleep(1000); // Delay for visual effect
            }
            cout << endl;
            cout << "Your Account is Created Successfully";
            SetColor(15, 0); // Reset to white text
            system("CLS"); // Clear screen for fresh start
        } else {
            SetColor(12, 0); // Red text
            cout << "Error opening file!";
            SetColor(15, 0); // Reset to white text
            return 1;
        }
    } else if (choice == '3') {
        // Exit
        SetColor(12, 0); // Red text
        cout << "\n\n\t\t\t\t\t\tExiting... \n";
        SetColor(15, 0); // Reset to white text
        Sleep(1000);
        exit(0);
    } else {
        SetColor(12, 0); // Red text
        cout << "Invalid choice!";
        SetColor(15, 0); // Reset to white text
        return 0; // Exit if an invalid choice is made
    }

previouslogin:
    SetColor(14, 0); // Yellow text
    cout << "\n\n\t\t\t\t\t\t\tLogin Here \n";
    SetColor(15, 0); // Reset to white text
    cout << " Enter Your 4 Digit Pin: ";
    cin >> pin1;

    // Check if the entered pin matches the stored pin
    if (pin1 == pin) {
        system("CLS");
        banking obj;
        obj.options();
    } else {
        SetColor(12, 0); // Red text
        cout << "Incorrect Pin! Please try again.";
        SetColor(15, 0); // Reset to white text
        goto previouslogin;
    }

    return 0;
}

void banking::options() {
    char select;
    while (1) {
        SetColor(15, 0); // White text
        SetColor(14, 0); 
        cout << "\t\t\t\t\t\t*           Bank Options        *\n";
        SetColor(15, 0); 
        cout << "\t\t\t\t\t\t_______________________________________\n\n\n";
        SetColor(9, 0);
        cout << " Press 1 For Creating New Account." << endl;
        SetColor(10, 0);
        cout << " Press 2 Display Customer Information." << endl;
        SetColor(11, 0);
        cout << " Press 3 For Updating Customer Information." << endl;
        SetColor(14, 0);
        cout << " Press 4 For Searching a Specific Customer." << endl;
        SetColor(13, 0);
        cout << " Press 5 For Transaction Operation Like Deposit and Withdraw." << endl;
        SetColor(12, 0);
		cout << " Press 6 For Logout." << endl;
		SetColor(15, 0);
        select = getch(); // what options select by user
        switch (select) {
        case '1':
            banking::newaccount();
            system("CLS");
            break;
        case '2':
            system("CLS");
            banking::display();
            break;
        case '3':
            system("CLS");
            banking::update();
            break;
        case '4':
            system("CLS");
            banking::search();
            break;
        case '5':
            system("CLS");
            banking::transaction();
            break;
        case '6':
            system("CLS");
            banking::logout();
            break;
        default:
            SetColor(12, 0); // Red text
            cout << "Invalid Operation! Please choose a valid option.";
            SetColor(15, 0); // Reset to white text
            break;
        }
    }
}

void banking::newaccount() {
    SetColor(14, 0); // Yellow text
    cout << "\t\t\t\t\t\t*       New Account Creation    *\n";
    cout << "\t\t\t\t\t\t_______________________________________\n\n\n";
    SetColor(15, 0); // Reset to white text
    cout << "Enter the details for the new customer:" << endl;
    cout << "Enter Your ID: ";
    cin >> customer[completed].ID;
    cout << "Enter Your Name: ";
    cin >> customer[completed].name;
    cout << "Enter Your Father's Name: ";
    cin >> customer[completed].fname;
    cout << "Enter Your Phone Number: ";
    cin >> customer[completed].phone;
    cout << "Enter Your ID Card Number: ";
    cin >> customer[completed].idcard;
    cout << "Enter Your Cash: ";
    cin >> customer[completed].cash;
    completed++;
}

void banking::display() {
    SetColor(14, 0); // Yellow text
    cout << "\t\t\t\t\t\t*       Customer Information    *\n";
    cout << "\t\t\t\t\t\t_______________________________________\n\n\n";
    SetColor(15, 0); // Reset to white text
    for (int i = 0; i < completed; i++) {
        cout << "Record of Customer " << i + 1 << ":" << endl;
        cout << "Customer Unique ID: " << customer[i].ID << endl;
        cout << "Customer Name: " << customer[i].name << endl;
        cout << "Customer Father's Name: " << customer[i].fname << endl;
        cout << "Customer Phone Number: " << customer[i].phone << endl;
        cout << "Customer ID Card Number: " << customer[i].idcard << endl;
        cout << "Customer Amount: " << customer[i].cash << endl;
        cout << "-----------------------------------" << endl;
    }
}

void banking::update() {
    SetColor(14, 0); // Yellow text
    cout << "\t\t\t\t\t\t*       Update Customer Data    *\n";
    cout << "\t\t\t\t\t\t_______________________________________\n\n\n";
    SetColor(15, 0); // Reset to white text
    cout << "Enter the ID of customer to update their information: ";
    cin >> id;
    bool found = false;
    for (int i = 0; i < completed; i++) {
        if (id == customer[i].ID) {
            found = true;
            cout << "\nExisting Record of Customer:" << endl;
            cout << "Customer Unique ID: " << customer[i].ID << endl;
            cout << "Customer Name: " << customer[i].name << endl;
            cout << "Customer Father's Name: " << customer[i].fname << endl;
            cout << "Customer Phone Number: " << customer[i].phone << endl;
            cout << "Customer ID Card Number: " << customer[i].idcard << endl;
            cout << "Customer Amount: " << customer[i].cash << endl;

            cout << "\n\nUpdate the Customer Information:" << endl;
            cout << "Enter New ID: ";
            cin >> customer[i].ID;
            cout << "Enter New Name: ";
            cin >> customer[i].name;
            cout << "Enter New Father's Name: ";
            cin >> customer[i].fname;
            cout << "Enter New Phone Number: ";
            cin >> customer[i].phone;
            cout << "Enter New ID Card Number: ";
            cin >> customer[i].idcard;
            cout << "Enter New Cash Amount: ";
            cin >> customer[i].cash;
            break;
        }
    }
    if (!found) {
        SetColor(12, 0); // Red text
        cout << "Customer Record NOT FOUND!" << endl;
        SetColor(15, 0); // Reset to white text
    }
}

void banking::search() {
    SetColor(14, 0); // Yellow text
    cout << "\t\t\t\t\t\t*       Search Customer Data    *\n";
    cout << "\t\t\t\t\t\t_______________________________________\n\n\n";
    SetColor(15, 0); // Reset to white text
    cout << "Enter the ID of customer to search their information: ";
    cin >> id;
    bool found = false;
    for (int i = 0; i < completed; i++) {
        if (id == customer[i].ID) {
            found = true;
            cout << "\nCustomer Record Found:" << endl;
            cout << "Customer Unique ID: " << customer[i].ID << endl;
            cout << "Customer Name: " << customer[i].name << endl;
            cout << "Customer Father's Name: " << customer[i].fname << endl;
            cout << "Customer Phone Number: " << customer[i].phone << endl;
            cout << "Customer ID Card Number: " << customer[i].idcard << endl;
            cout << "Customer Amount: " << customer[i].cash << endl;
            break;
        }
    }
    if (!found) {
        SetColor(12, 0); // Red text
        cout << "Customer Record NOT FOUND!" << endl;
        SetColor(15, 0); // Reset to white text
    }
}

void banking::transaction() {
    int cash;
    int select;
    SetColor(14, 0); // Yellow text
    cout << "\t\t\t\t\t\t*          Transaction          *\n";
    cout << "\t\t\t\t\t\t_______________________________________\n\n\n";
    SetColor(15, 0); // Reset to white text
    cout << "Enter the ID of customer for transaction: ";
    cin >> id;
    for (int i = 0; i < completed; i++) {
        if (id == customer[i].ID) {
            cout << "\nExisting Record of Customer:" << endl;
            cout << "Customer Unique ID: " << customer[i].ID << endl;
            cout << "Customer Name: " << customer[i].name << endl;
            cout << "Customer Father's Name: " << customer[i].fname << endl;
            cout << "Customer Phone Number: " << customer[i].phone << endl;
            cout << "Customer ID Card Number: " << customer[i].idcard << endl;
            cout << "Customer Amount: " << customer[i].cash << endl;

            cout << "\nPress 1 for Deposit." << endl;
            cout << "Press 2 for Withdraw." << endl;
            cin >> select;

            switch (select) {
            case 1:
                SetColor(10, 0); // Green text
                cout << "Enter the amount of cash to deposit: ";
                cin >> cash;
                customer[i].cash += cash;
                cout << "Successfully Deposited!" << endl;
                SetColor(15, 0); // Reset to white text
                break;
            case 2:
                SetColor(12, 0); // Red text
                cout << "Enter the amount of cash to withdraw: ";
                cin >> cash;
                if (cash > customer[i].cash) {
                    cout << "Insufficient balance. You cannot withdraw more than the existing balance.";
                } else {
                    customer[i].cash -= cash;
                    SetColor(10, 0); // Green text
                    cout << "Successfully Withdrawn!" << endl;
                }
                SetColor(15, 0); // Reset to white text
                break;
            default:
                SetColor(12, 0); // Red text
                cout << "Invalid Operation!" << endl;
                SetColor(15, 0); // Reset to white text
                break;
            }
            break;
        }
    }
}

void banking::logout() {
    SetColor(15, 0); // White text
    cout << "\t\t\t\t\t\t*         Logging Out...        *\n";
    cout << "\t\t\t\t\t\t_______________________________________\n\n\n";
    Sleep(1000);
    SetColor(15, 0); // Reset to white text
    system("CLS"); // Clear screen
    main(); // Redirect to the main function
}