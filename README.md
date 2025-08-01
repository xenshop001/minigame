# 🎣 QTE Minigame – Modern ESX kompatibilis minijáték NUI

Ez a resource egy, billentyűalapú gyorsreakciós mini-játékot kínál NUI alapon, amit más scriptek (pl. horgászat, lockpick, stb.) könnyedén használhatnak exportként.

## 🌟 Főbb jellemzők

- Interaktív, neon stílusú QTE panel
- Teljesen testreszabható billentyűsorozat
- Könnyen beépíthető bármilyen ESX / standalone scriptbe
- NUI támogatás (HTML, CSS, JS)
- Exportálható és újrahasznosítható




## ⚙️ Használat más scriptekből

### 1. Minijáték elindítása

exports['qte_minigame']:startMinigame()

PÉLDA:

RegisterNetEvent('esx_horgaszat:startMinigame', function()
    local status, err = pcall(function()
        exports['qte_minigame']:startMinigame()
    end)
    end
end)


  
