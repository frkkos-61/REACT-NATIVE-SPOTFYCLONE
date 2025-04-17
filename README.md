# REACT-NATIVE-SPOTFYCLONE

<h4>

SpotifyCloneApp: React Native ile Müzik Uygulaması Geliştirme Yolculuğum 🎵
Merhaba! Bu yazıda, React Native kullanarak geliştirdiğim SpotifyCloneApp projemi tanıtmak istiyorum. Bu proje, bir müzik uygulamasının temel özelliklerini (şarkı arama, oynatma, duraklatma, ileri/geri sarma) içeren bir mobil uygulamadır. Geliştirme sürecinde birçok kütüphane kullandım, çeşitli sorunlarla karşılaştım ve bu sorunları çözerek projeyi tamamladım. İşte projenin detayları ve geliştirme sürecinde attığımız adımlar:

Projenin Amacı ve Özellikleri
Bu proje, React Native ile bir müzik uygulamasının temel işlevlerini hayata geçirmeyi amaçlıyor. Uygulamanın temel özellikleri şunlar:

Şarkı Arama: Kullanıcılar, bir arama çubuğu üzerinden şarkı arayabilir (örneğin, "Eminem" gibi bir sanatçı adı ile).
Şarkı Listeleme: Arama sonuçları, albüm kapak resmi, şarkı adı ve sanatçı adı ile birlikte bir listede gösterilir.
Müzik Oynatma: Kullanıcılar, listedeki bir şarkıyı seçerek oynatabilir, duraklatabilir, ileri veya geri sarabilir.
Modal ile Oynatma Kontrolü: Şarkı oynatıldığında, bir modal pencere açılır ve kullanıcıya oynatma kontrolleri (oynat/duraklat, ileri/geri sarma) sunulur.
Arka Plan Oynatma: Uygulama, arka planda müzik çalma özelliğini destekler.
Kullanılan Teknolojiler ve Kütüphaneler
Bu projeyi geliştirirken aşağıdaki teknolojileri ve kütüphaneleri kullandım:

React Native (0.78.2): Mobil uygulama geliştirme için temel framework.
react-native-track-player (4.1.1 ve sonrası): Müzik oynatma, duraklatma, ileri/geri sarma gibi işlevler için.
axios: API isteklerini yapmak için.
react-native-linear-gradient: Arayüzde degrade arka planlar oluşturmak için.
react-native-vector-icons (Ionicons, AntDesign, Entypo): Arayüzde ikonlar kullanmak için.
react-native-modal: Şarkı oynatma sırasında kontrol panelini göstermek için bir modal pencere oluşturmak için.
@react-navigation/native: Uygulama içinde ekranlar arasında gezinmek için (örneğin, geri dönme butonu).
Shazam API (RapidAPI üzerinden): Şarkı arama ve veri çekme işlemleri için (başlangıçta Deezer API kullanıyorduk, ancak CORS sorunları nedeniyle Shazam API’ye geçtik).

</h4>

<h5>Gif Dosyası :</h5>

![](tanıtım.gif)