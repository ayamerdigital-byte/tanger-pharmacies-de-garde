export const CONTACT_EMAIL = 'ayamerdigital@gmail.com';
export const SOURCE_URL = 'https://web.facebook.com/pharmacies.degarde.tanger';
export const REPO_URL = 'https://github.com/ayamerdigital-byte/tanger-pharmacies-de-garde';

const contact = { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` };
const source = { label: 'Pharmacies de garde à Tanger — Facebook', href: SOURCE_URL };

export const documents = {
  fr: {
    about: {
      title: 'À propos et méthode éditoriale',
      description: 'Découvrez qui publie ce guide indépendant des pharmacies de garde à Tanger, ses sources, ses vérifications et ses limites.',
      lead: 'Un guide bénévole pour trouver plus facilement les pharmacies de garde annoncées à Tanger.',
      sections: [
        { title: 'Qui gère ce site ?', paragraphs: [
          'Ce site gratuit est maintenu par le compte GitHub ayamerdigital-byte. Il est indépendant de la page Facebook source, du syndicat des pharmaciens, des pharmacies répertoriées et des autorités de santé. Il ne fournit aucun conseil médical.',
        ], links: [{ label: 'Voir le projet sur GitHub', href: REPO_URL }] },
        { title: 'D’où viennent les informations ?', paragraphs: [
          'Les dates, horaires et noms de pharmacies proviennent des publications publiques de la page Facebook « Pharmacies de garde à Tanger ». Le site conserve un lien vers cette page et vers l’image originale de chaque annonce.',
          'Un programme lit les noms sur les images avec la reconnaissance de texte (OCR). Les noms reconnus sont rapprochés d’un répertoire d’adresses et de numéros de téléphone dont les sources sont liées sur les cartes. Les résultats non rapprochés restent signalés comme à vérifier.',
        ], links: [source] },
        { title: 'Fréquence et limites', paragraphs: [
          'Une vérification automatique est prévue plusieurs fois par jour. Les tâches planifiées, l’accès à Facebook et la lecture automatique peuvent échouer ou être retardés. La date de la dernière vérification est visible sur la page principale.',
          'Une adresse référencée peut avoir changé. Le bouton Maps lance une recherche par nom et adresse : ce n’est pas une position GPS certifiée. Une liste ancienne ne confirme jamais qu’une pharmacie est ouverte maintenant. Vérifiez la date, consultez la source et appelez la pharmacie avant de vous déplacer.',
        ] },
        { title: 'Corrections et contact', paragraphs: [
          'Pour signaler une erreur de nom, d’adresse, d’horaire ou de numéro, indiquez la pharmacie concernée, la date de l’annonce et une source vérifiable. Vous pouvez aussi demander la correction ou le retrait d’un contenu vous concernant.',
        ], links: [contact] },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité',
      description: 'Comment ce guide des pharmacies de garde à Tanger utilise les données, les services externes et les demandes de contact.',
      lead: 'Cette page décrit le fonctionnement actuel du site et les services externes utilisés lors de votre visite.',
      sections: [
        { title: 'Responsable et contact', paragraphs: [
          'Le site est maintenu par le compte GitHub ayamerdigital-byte. Pour une question sur cette politique, une demande d’accès, de rectification ou de retrait d’un contenu vous concernant, écrivez-nous à l’adresse ci-dessous.',
        ], links: [contact] },
        { title: 'Données demandées par le site', paragraphs: [
          'Le code du site ne crée pas de compte, ne demande pas votre position, ne comporte pas de formulaire et n’utilise pas d’outil d’analyse d’audience ou de publicité. Il ne dépose pas de cookie lui-même. Un onglet ouvert vérifie périodiquement si une nouvelle liste est publiée.',
          'Si vous nous écrivez, nous recevons les informations que vous choisissez d’envoyer et les utilisons pour traiter votre demande. Évitez d’envoyer des données médicales ou d’autres informations sensibles qui ne sont pas nécessaires.',
        ] },
        { title: 'Hébergement et services externes', paragraphs: [
          'Le site est hébergé sur GitHub Pages. GitHub indique enregistrer l’adresse IP des visiteurs à des fins de sécurité. Les polices DM Sans et Noto Sans Arabic sont chargées depuis Google Fonts ; votre navigateur contacte alors les serveurs de Google.',
          'Les liens vers Facebook, Google Maps, les annuaires de pharmacies ou GitHub ouvrent des services externes régis par leurs propres politiques. Le site ne transmet pas votre position à Google Maps ; son lien contient seulement le nom et l’adresse textuelle de la pharmacie recherchée.',
        ], links: [
          { label: 'Confidentialité de GitHub', href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement' },
          { label: 'Confidentialité et Google Fonts', href: 'https://fonts.googleblog.com/2022/11/your-privacy-and-google-fonts.html' },
        ] },
        { title: 'Durée et vos demandes', paragraphs: [
          'Nous ne conservons pas de base de données de visiteurs. GitHub et Google gèrent leurs propres journaux selon leurs politiques. Si vous nous contactez, vous pouvez demander l’accès, la correction ou la suppression de votre message en écrivant à la même adresse.',
          'Cette politique sera mise à jour si le fonctionnement du site ou ses services changent.',
        ], links: [contact] },
      ],
    },
    terms: {
      title: 'Conditions d’utilisation',
      description: 'Conditions d’utilisation du guide indépendant des pharmacies de garde à Tanger et limites des listes publiées.',
      lead: 'Ce guide gratuit aide à consulter des annonces publiques de pharmacies de garde à Tanger.',
      sections: [
        { title: 'Usage du guide', paragraphs: [
          'Les listes sont fournies à titre informatif. Le site n’est ni une pharmacie, ni un service médical ou d’urgence, ni une publication officielle du syndicat des pharmaciens. Il ne donne pas de conseil médical.',
          'Avant de partir, vérifiez la date et les horaires de l’annonce, consultez la publication source et appelez la pharmacie. En cas d’urgence médicale, utilisez les services d’urgence appropriés.',
        ] },
        { title: 'Exactitude et disponibilité', paragraphs: [
          'Les publications Facebook, la reconnaissance de texte, les adresses d’annuaires et les recherches Maps peuvent être incomplets, obsolètes ou erronés. Les vérifications automatiques peuvent être retardées ou interrompues. Une adresse sur ce site ne garantit pas que la pharmacie est ouverte.',
          'Nous pouvons corriger, retirer ou modifier les informations lorsque nous constatons une erreur. La date de la dernière vérification est affichée sur la page principale.',
        ] },
        { title: 'Sources et liens externes', paragraphs: [
          'Les images et textes repris de la page Facebook restent attribués à leur source. Les autres sites liés, notamment Facebook, Google Maps et les annuaires, appliquent leurs propres conditions. La présence d’un lien ne signifie pas que ces services approuvent ce guide.',
        ], links: [source] },
        { title: 'Signaler une erreur', paragraphs: [
          'Pour demander une correction ou signaler un contenu problématique, contactez le mainteneur en précisant l’annonce concernée et une source utile à la vérification.',
        ], links: [contact] },
      ],
    },
  },
  ar: {
    about: {
      title: 'عن الموقع وطريقة العمل',
      description: 'تعرف على مصدر لوائح صيدليات الحراسة بطنجة وطريقة قراءة الأسماء والتحقق من العناوين وحدود هذه الخدمة المستقلة.',
      lead: 'دليل تطوعي مجاني لتسهيل العثور على صيدليات الحراسة المعلن عنها في طنجة.',
      sections: [
        { title: 'من يدير الموقع؟', paragraphs: [
          'يدير هذا الموقع المجاني حساب GitHub المسمى ayamerdigital-byte. الموقع مستقل عن صفحة فيسبوك المصدر، ونقابة الصيادلة، والصيدليات المذكورة، والجهات الصحية. ولا يقدم استشارات طبية.',
        ], links: [{ label: 'المشروع على GitHub', href: REPO_URL }] },
        { title: 'من أين تأتي المعلومات؟', paragraphs: [
          'تأتي التواريخ والأوقات وأسماء الصيدليات من المنشورات العامة لصفحة «صيدليات الحراسة بطنجة» على فيسبوك. نوفر رابط الصفحة والصورة الأصلية لكل إعلان.',
          'نقرأ الأسماء من الصور آلياً بتقنية التعرف على النصوص (OCR)، ثم نطابقها مع دليل عناوين وأرقام هاتف مرفقة بمصادرها في البطاقات. إذا تعذر التأكد من المطابقة، نظهر أنها تحتاج إلى مراجعة.',
        ], links: [{ label: 'صفحة فيسبوك المصدر', href: SOURCE_URL }] },
        { title: 'التحديثات وحدود الخدمة', paragraphs: [
          'من المقرر التحقق آلياً عدة مرات يومياً. قد تتأخر المهام المجدولة أو يتعذر الوصول إلى فيسبوك أو قراءة الصور. يظهر وقت آخر تحقق في الصفحة الرئيسية.',
          'قد يتغير عنوان الصيدلية. زر الخرائط يجري بحثاً بالاسم والعنوان، ولا يشير إلى موقع GPS مؤكّد. اللائحة القديمة لا تعني أن الصيدلية مفتوحة الآن. تحقق من التاريخ والمنشور الأصلي واتصل بالصيدلية قبل الذهاب.',
        ] },
        { title: 'التصحيحات والتواصل', paragraphs: [
          'للإبلاغ عن خطأ في الاسم أو العنوان أو التوقيت أو الرقم، أرسل اسم الصيدلية وتاريخ الإعلان ومصدراً يمكن التحقق منه. يمكنك أيضاً طلب تصحيح محتوى يخصك أو حذفه.',
        ], links: [contact] },
      ],
    },
    privacy: {
      title: 'سياسة الخصوصية',
      description: 'كيف يتعامل دليل صيدليات الحراسة بطنجة مع البيانات والخدمات الخارجية ورسائل التواصل.',
      lead: 'تشرح هذه الصفحة طريقة عمل الموقع الحالية والخدمات الخارجية المستخدمة عند زيارته.',
      sections: [
        { title: 'المسؤول والتواصل', paragraphs: [
          'يدير الموقع حساب GitHub المسمى ayamerdigital-byte. للاستفسار عن هذه السياسة أو طلب الاطلاع على محتوى يخصك أو تصحيحه أو حذفه، راسلنا على العنوان أدناه.',
        ], links: [contact] },
        { title: 'البيانات التي يطلبها الموقع', paragraphs: [
          'لا ينشئ كود الموقع حسابات، ولا يطلب موقعك الجغرافي، ولا يحتوي على نموذج إدخال، ولا يستخدم أدوات تحليل زيارات أو إعلانات. ولا يضع كود الموقع ملفات تعريف ارتباط بنفسه. تتحقق الصفحة المفتوحة دورياً من نشر لائحة جديدة.',
          'إذا راسلتنا، نتلقى المعلومات التي تختار إرسالها ونستخدمها للرد على طلبك. تجنب إرسال بيانات طبية أو معلومات حساسة غير ضرورية.',
        ] },
        { title: 'الاستضافة والخدمات الخارجية', paragraphs: [
          'يستضيف GitHub Pages هذا الموقع، ويذكر GitHub أنه يسجل عنوان IP للزائر لأغراض أمنية. تُحمّل خطوط DM Sans وNoto Sans Arabic من Google Fonts، ولذلك يتصل متصفحك بخوادم Google.',
          'تفتح روابط فيسبوك وخرائط Google وأدلة الصيدليات وGitHub خدمات خارجية تخضع لسياساتها الخاصة. لا يرسل الموقع موقعك الجغرافي إلى خرائط Google؛ يحتوي الرابط فقط على اسم الصيدلية وعنوانها النصي.',
        ], links: [
          { label: 'سياسة خصوصية GitHub', href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement' },
          { label: 'الخصوصية وخطوط Google', href: 'https://fonts.googleblog.com/2022/11/your-privacy-and-google-fonts.html' },
        ] },
        { title: 'الاحتفاظ والطلبات', paragraphs: [
          'لا نحتفظ بقاعدة بيانات للزوار. يدير GitHub وGoogle سجلاتهما وفق سياساتهما. إذا تواصلت معنا، يمكنك طلب الاطلاع على رسالتك أو تصحيحها أو حذفها عبر البريد نفسه.',
          'سنحدث هذه السياسة إذا تغير عمل الموقع أو الخدمات المستخدمة فيه.',
        ], links: [contact] },
      ],
    },
    terms: {
      title: 'شروط الاستخدام',
      description: 'شروط استخدام دليل صيدليات الحراسة المستقل بطنجة وحدود دقة اللوائح المنشورة.',
      lead: 'يساعدك هذا الدليل المجاني على الاطلاع على الإعلانات العامة لصيدليات الحراسة بطنجة.',
      sections: [
        { title: 'استخدام الدليل', paragraphs: [
          'اللوائح للعلم فقط. الموقع ليس صيدلية ولا خدمة طبية أو طوارئ، وليس منشوراً رسمياً من نقابة الصيادلة. ولا يقدم نصائح طبية.',
          'قبل الذهاب، تحقق من تاريخ الإعلان وتوقيته، وراجع المنشور الأصلي، واتصل بالصيدلية. في الحالات الطبية الطارئة، استخدم خدمات الطوارئ المناسبة.',
        ] },
        { title: 'الدقة والتوفر', paragraphs: [
          'قد تكون منشورات فيسبوك أو نتائج قراءة النصوص أو عناوين الأدلة أو نتائج الخرائط ناقصة أو قديمة أو خاطئة. وقد تتأخر التحديثات الآلية أو تتوقف. وجود عنوان هنا لا يؤكد أن الصيدلية مفتوحة.',
          'يمكننا تصحيح المعلومات أو حذفها أو تعديلها عند اكتشاف خطأ. يظهر وقت آخر تحقق في الصفحة الرئيسية.',
        ] },
        { title: 'المصادر والروابط الخارجية', paragraphs: [
          'تبقى الصور والنصوص المنقولة من صفحة فيسبوك منسوبة إلى مصدرها. تخضع المواقع المرتبطة، ومنها فيسبوك وخرائط Google والأدلة، لشروطها الخاصة. وجود رابط لا يعني تأييد تلك الجهات لهذا الدليل.',
        ], links: [{ label: 'صفحة فيسبوك المصدر', href: SOURCE_URL }] },
        { title: 'الإبلاغ عن خطأ', paragraphs: [
          'لطلب تصحيح أو الإبلاغ عن محتوى غير مناسب، راسل مسؤول الموقع مع تحديد الإعلان ومصدر يساعد على التحقق.',
        ], links: [contact] },
      ],
    },
  },
};

export const documentKeys = ['about', 'privacy', 'terms'];
