# GitHub par Upload kaise karein

## Option 1: Web se Direct Upload (Sabse aasan)

1. **https://github.com/iamfzk/fahd-zaafar-khan-global-tech** kholo
2. **Add file** → **Upload files** pe click karo
3. Ye folder kholo: `c:\Users\mohd.fahad\fzk-global-tech`
4. **Saari files select karo** (Ctrl+A) - EXCEPT `.git` folder
5. Drag & drop karo GitHub pe
6. **Commit changes** pe click karo
7. **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **master** → Save

---

## Option 2: Terminal se Push

PowerShell kholo (Cursor ke andar ya bahar):

```powershell
cd "c:\Users\mohd.fahad\fzk-global-tech"
git push -u origin master --force
```

Jab credentials maange:
- **Username:** iamfzk
- **Password:** GitHub Personal Access Token (Settings → Developer settings → Tokens)
