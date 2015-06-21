/*File has test data.  The day will always be today, the times are hard coded*/

var today = new Date();

module.exports = [
  {
    'title': 'Apple Watch Basics',
    'image': 'http://images.apple.com/data/retail/assets/en_us/web/wsicons/watch_icon.png',
    'description': 'Bring your Apple Watch—along with your iPhone—and get familiar with your most personal device yet. We’ll show you how to get started using Glances, gestures, watch faces, and more.',
    'presenter': [
      'Johnny Appleseed'
    ],
    'seats': {
      'total': 50,
      'available': 45
    },
    'time': {
      'start': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '9', '0'),
      'end': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '10', '0')
    }
  },
  {
    'title': 'iCloud Basics',
    'image': 'http://images.apple.com/data/retail/assets/en_us/web/wsicons/icloud.png',
    'description': 'iCloud helps you access your files across iPhone, iPad, Mac, and the web. Learn great ways to share files with friends and family, and get peace of mind with backups and automatic syncing.',
    'presenter': [
      'Johnny Appleseed'
    ],
    'seats': {
      'total': 50,
      'available': 25
    },
    'time': {
      'start': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '9', '30'),
      //'end': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '10', '0')
      'end': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '18', '0')

    }
  },
  {
    'title': 'Create Great-Looking Documents with Pages for Mac',
    'image': 'http://images.apple.com/205/datapub/retail/en_US/concierge/workshop-icons/icon_pages.png',
    'description': 'In this workshop, you’ll learn how to use Pages to design beautiful documents in no time with built-in templates and powerful writing tools. We’ll help you create everything from basic documents to reports, posters, cards, and newsletters — then show you easy ways to share them all.',
    'presenter': [
      'Johnny Appleseed'
    ],
    'seats': {
      'total': 50,
      'available': 43
    },
    'time': {
      'start': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '9', '30'),
      'end': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '10', '0')
    }
  },
  {
    'title': 'iPhone Photography',
    'image': 'http://images.apple.com/data/retail/assets/en_us/web/wsicons/photography.png',
    'description': 'Learn how to capture and edit great-looking photos using the camera and tools already on your iPhone.',
    'presenter': [
      'Johnny Appleseed'
    ],
    'seats': {
      'total': 25,
      'available': 5
    },
    'time': {
      'start': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '12', '0'),
      'end': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '13', '0')
    }
  },
  {
    'title': 'Personalize Your Mac',
    'image': 'http://images.apple.com/data/retail/assets/en_us/web/wsicons/personalize_mac.png',
    'description': 'Already familiar with the basics? Come to this workshop to discover great ways to personalize your Mac. Find out how to customize your desktop or screen saver and learn handy keyboard shortcuts, gestures, and more.',
    'presenter': [
      'Johnny Appleseed'
    ],
    'seats': {
      'total': 15,
      'available': 3
    },
    'time': {
      'start': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '12', '15'),
      'end' : new Date(today.getFullYear(), today.getMonth(), today.getDate(), '18', '15')
    }
  },
  {
    'title': 'Spreadsheets Made Easy with Numbers for Mac',
    'image': 'http://images.apple.com/205/datapub/retail/en_US/concierge/workshop-icons/icon_numbers.png',
    'description': 'We’ll discuss how you can use the Numbers app to easily create and track to-do lists, a personal budget, travel plans, and more — even if you’re not a spreadsheet expert.',
    'presenter': [
      'Johnny Appleseed',
      'Jane Doe'
    ],
    'seats': {
      'total': 15,
      'available': 2
    },
    'time': {
      'start': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '12', '0'),
      'end': new Date(today.getFullYear(), today.getMonth(), today.getDate(), '16', '0')
    }
  }
];
