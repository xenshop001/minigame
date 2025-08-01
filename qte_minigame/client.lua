local isGameActive = false
local function startMinigame()
    if isGameActive then
        return
    end
    isGameActive = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = 'start'
    })
end
exports('startMinigame', startMinigame)
RegisterNUICallback('minigameResult', function(data, cb)
    SetNuiFocus(false, false)
    isGameActive = false

    TriggerEvent('xen_minigame:end', data.success)

    cb('ok')
end)
RegisterCommand('minigame', function(source, args)
    startMinigame()
end)