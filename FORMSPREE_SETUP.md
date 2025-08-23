# Configuration Formspree

## Étapes pour configurer l'envoi d'emails

### 1. Créer un compte Formspree
1. Allez sur [formspree.io](https://formspree.io)
2. Cliquez sur "Sign Up" et créez un compte gratuit
3. Vérifiez votre email

### 2. Créer un nouveau formulaire
1. Dans votre dashboard Formspree, cliquez sur "New Form"
2. Donnez un nom à votre formulaire (ex: "Candidatures Models Academy")
3. Sélectionnez votre email de destination : `contact@modelacademymgnt.com`
4. Cliquez sur "Create Form"

### 3. Récupérer l'ID du formulaire
1. Une fois le formulaire créé, vous verrez un endpoint comme :
   `https://formspree.io/f/xqkobvzw`
2. L'ID du formulaire est la partie après `/f/` (dans cet exemple : `xqkobvzw`)

### 4. Mettre à jour le code
1. Ouvrez le fichier `index.html`
2. Trouvez la ligne :
   ```html
   <form id="multiStepForm" class="multi-step-form-container" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Remplacez `YOUR_FORM_ID` par votre vrai ID de formulaire

### 5. Tester
1. Remplissez le formulaire sur votre site
2. Soumettez-le
3. Vous devriez recevoir un email de confirmation
4. Vérifiez que l'email arrive bien à `contact@modelacademymgnt.com`

## Fonctionnalités incluses

- ✅ Envoi automatique des données du formulaire
- ✅ Sujet personnalisé avec le nom du candidat
- ✅ Email de réponse automatique au candidat
- ✅ Protection anti-spam
- ✅ Limite de 50 soumissions par mois (gratuit)

## Personnalisation (optionnel)

Vous pouvez personnaliser :
- Le message de confirmation
- L'email de réponse automatique
- Les notifications
- Le design des emails

Tout cela se fait depuis le dashboard Formspree.
