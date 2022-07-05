var output = document.getElementById("output");
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var cancel = document.getElementById("cancel");
var country = document.getElementById("country");
var countryLang = document.getElementById("countryLang");
var confd = document.getElementById("confd");

// Using web API for Speechrecognithion
var speechRecognition = speechRecognition || webkitSpeechRecognition;
var recognizer = new speechRecognition();

// We are making it recognizing the speech and display it directly
recognizer.interimResults = true;

//Languages list
var langList = [['Arabic', ['ar-SA', 'Saudi Arabia'],['ar-EG', 'Egypt']],
['Afrikaans',       ['af-ZA']],
['አማርኛ',           ['am-ET']],
['Azərbaycanca',    ['az-AZ']],
['বাংলা',            ['bn-BD', 'বাংলাদেশ'],
                 ['bn-IN', 'ভারত']],
['Bahasa Indonesia',['id-ID']],
['Bahasa Melayu',   ['ms-MY']],
['Català',          ['ca-ES']],
['Čeština',         ['cs-CZ']],
['Dansk',           ['da-DK']],
['Deutsch',         ['de-DE']],
['English',         ['en-AU', 'Australia'],
                 ['en-CA', 'Canada'],
                 ['en-IN', 'India'],
                 ['en-KE', 'Kenya'],
                 ['en-TZ', 'Tanzania'],
                 ['en-GH', 'Ghana'],
                 ['en-NZ', 'New Zealand'],
                 ['en-NG', 'Nigeria'],
                 ['en-ZA', 'South Africa'],
                 ['en-PH', 'Philippines'],
                 ['en-GB', 'United Kingdom'],
                 ['en-US', 'United States']],
['Español',         ['es-AR', 'Argentina'],
                 ['es-BO', 'Bolivia'],
                 ['es-CL', 'Chile'],
                 ['es-CO', 'Colombia'],
                 ['es-CR', 'Costa Rica'],
                 ['es-EC', 'Ecuador'],
                 ['es-SV', 'El Salvador'],
                 ['es-ES', 'España'],
                 ['es-US', 'Estados Unidos'],
                 ['es-GT', 'Guatemala'],
                 ['es-HN', 'Honduras'],
                 ['es-MX', 'México'],
                 ['es-NI', 'Nicaragua'],
                 ['es-PA', 'Panamá'],
                 ['es-PY', 'Paraguay'],
                 ['es-PE', 'Perú'],
                 ['es-PR', 'Puerto Rico'],
                 ['es-DO', 'República Dominicana'],
                 ['es-UY', 'Uruguay'],
                 ['es-VE', 'Venezuela']],
['Euskara',         ['eu-ES']],
['Filipino',        ['fil-PH']],
['Français',        ['fr-FR']],
['Basa Jawa',       ['jv-ID']],
['Galego',          ['gl-ES']],
['ગુજરાતી',           ['gu-IN']],
['Hrvatski',        ['hr-HR']],
['IsiZulu',         ['zu-ZA']],
['Íslenska',        ['is-IS']],
['Italiano',        ['it-IT', 'Italia'],
                 ['it-CH', 'Svizzera']],
['ಕನ್ನಡ',             ['kn-IN']],
['ភាសាខ្មែរ',          ['km-KH']],
['Latviešu',        ['lv-LV']],
['Lietuvių',        ['lt-LT']],
['മലയാളം',          ['ml-IN']],
['मराठी',             ['mr-IN']],
['Magyar',          ['hu-HU']],
['ລາວ',              ['lo-LA']],
['Nederlands',      ['nl-NL']],
['नेपाली भाषा',        ['ne-NP']],
['Norsk bokmål',    ['nb-NO']],
['Polski',          ['pl-PL']],
['Português',       ['pt-BR', 'Brasil'],
                 ['pt-PT', 'Portugal']],
['Română',          ['ro-RO']],
['සිංහල',          ['si-LK']],
['Slovenščina',     ['sl-SI']],
['Basa Sunda',      ['su-ID']],
['Slovenčina',      ['sk-SK']],
['Suomi',           ['fi-FI']],
['Svenska',         ['sv-SE']],
['Kiswahili',       ['sw-TZ', 'Tanzania'],
                 ['sw-KE', 'Kenya']],
['ქართული',       ['ka-GE']],
['Հայերեն',          ['hy-AM']],
['தமிழ்',            ['ta-IN', 'இந்தியா'],
                 ['ta-SG', 'சிங்கப்பூர்'],
                 ['ta-LK', 'இலங்கை'],
                 ['ta-MY', 'மலேசியா']],
['తెలుగు',           ['te-IN']],
['Tiếng Việt',      ['vi-VN']],
['Türkçe',          ['tr-TR']],
['اُردُو',            ['ur-PK', 'پاکستان'],
                 ['ur-IN', 'بھارت']],
['Ελληνικά',         ['el-GR']],
['български',         ['bg-BG']],
['Pусский',          ['ru-RU']],
['Српски',           ['sr-RS']],
['Українська',        ['uk-UA']],
['한국어',            ['ko-KR']],
['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                 ['cmn-Hans-HK', '普通话 (香港)'],
                 ['cmn-Hant-TW', '中文 (台灣)'],
                 ['yue-Hant-HK', '粵語 (香港)']],
['日本語',           ['ja-JP']],
['हिन्दी',             ['hi-IN']],
['ภาษาไทย',         ['th-TH']]];

// Default language on page load
recognizer.lang = "ar-SA";
// now create a list of language to select on page
for(var i=0; i<langList.length; i++){
  // add it in the select tag
  var countryList = countryList + '<option value="'+i+'">'+langList[i][0]+'</option>';
}
country.innerHTML = countryList;
// some languages are used in more that one country Now specify languages for country
country.onchange = function() {
  var countryVal = country.value;
  // we have to give the array variable to get data "langList"
  var selectCount = langList[countryVal];
  if(selectCount.length <= 2){
    var countryLangList = countryLangList + '<option value="'+selectCount[1][0]+'">'+selectCount[0]+'</option>';
  }else{
    for(var j=1; j<selectCount.length; j++){
    var countryLangList = countryLangList + '<option value="'+selectCount[j][0]+'">'+selectCount[j][1]+'</option>';
    }
  }
  countryLang.innerHTML = countryLangList;
  countryLang.style.display = "inline-block";
  recognizer.lang = countryLang.value;
}
// first set the value for lang
countryLang.onchange = function() {
  // it will get the value and assign to the "recognizer.lang" on selecting
  recognizer.lang = countryLang.value;
}
// Events
start.onclick = function() {
  recognizer.start();
}
stop.onclick = function() {
  recognizer.stop();
}
cancel.onclick = function() {
  recognizer.abort();
  confd.innerHTML = "Canceled";
}
// when the recognizing start
recognizer.onstart = function() {
  confd.innerHTML = "Listinning ...";
}
recognizer.onspeechend = function() {
  stop.click();
    confd.innerHTML = "Stopped";
}
recognizer.onresult = function(event) {
  var outText = event.results[0][0].transcript;
  output.value = outText;
}
