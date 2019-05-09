const portmantaeu = require('./index');

portmantaeu('word1', 'word2', ['ryhming'])
portmantaeu('word1', ['word2'], ['ryhming'])
portmantaeu(['word1'], ['word2'], ['ryhming'])
portmantaeu('word1', 'word2')
portmantaeu('word1')
portmantaeu('word1', null, ['ryhming'])