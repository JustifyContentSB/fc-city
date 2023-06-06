const {
    FTP_HOST,
    FTP_USER,
    FTP_PASSWORD,
    FTP_DEST,
    FTP_URI,
    FTP_DEMO_HOST,
    FTP_DEMO_USER,
    FTP_DEMO_PASSWORD,
    FTP_DEMO_DEST,
    FTP_DEMO_URI,
  } = process.env;

  module.exports = {
    title: 'fc-city',
    description: 'Детская футбольная школа \'СИТИ\'',
    authors: [
      {
        name: 'Алексей Мороз',
        job: 'Frontend-разработчик',
        contacts: [
          {
            title: '@alexmoroz14',
            href: 'https://t.me/@alexmoroz14',
          },
          {
            title: 'alexey.moroz14@gmail.com',
            href: 'mailto:alexey.moroz14@gmail.com',
          },
        ],
      }, {
        name: 'Рахиб Салехли',
        job: 'Frontend-разработчик',
        contacts: [
          {
            title: '@rxbweb',
            href: 'https://t.me/@rxbweb',
          },
        ],
      },
    ],
    ftp: {
      default: {
          host: FTP_HOST,
          user: FTP_USER,
          password: FTP_PASSWORD,
          dest: FTP_DEST,
          uri: FTP_URI
      },
      demo: {
          host: FTP_DEMO_HOST,
          user: FTP_DEMO_USER,
          password: FTP_DEMO_PASSWORD,
          dest: FTP_DEMO_DEST,
          uri: FTP_DEMO_URI
      }
    },
    presets: {
      deploy: {
          babel: true,
          compress: true,
          mode: 'build',
          abstract: true
      }
    },
  };
