# AI Solar System Project

This project is a Django-based web application that simulates and visualizes the solar system. It provides interactive features and a user-friendly interface for exploring planets and other celestial bodies.

## Features
- Django backend for managing solar system data
- Interactive frontend with JavaScript and CSS
- Visual representation of planets and their orbits
- Modular structure for easy extension

## Project Structure
```
solar_system_project/
├── db.sqlite3
├── manage.py
├── solar_system/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── migrations/
├── solar_system_project/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── solar_system.js
└── templates/
    ├── base.html
    └── solar_system/
        └── index.html
```

## Screenshot

![image](https://github.com/user-attachments/assets/985e1398-cecd-436d-a0cf-ce42155e2bd9)


## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**
   - Create a virtual environment (optional but recommended):
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install required packages:
     ```bash
     pip install -r requirements.txt
     ```
3. **Apply migrations**
   ```bash
   python manage.py migrate
   ```
4. **Run the development server**
   ```bash
   python manage.py runserver
   ```
5. **Access the application**
   - Open your browser and go to `http://127.0.0.1:8000/`

## Customization
- Update frontend logic in `static/js/solar_system.js` and styles in `static/css/style.css`.

## License
This project is for educational purposes.

