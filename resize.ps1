Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem "asset\img\*.png" | Where-Object { $_.Name -ne 'husqvana.png' }

foreach ($file in $files) {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    
    # Target size
    $targetWidth = 1024
    $targetHeight = 1024
    
    # Calculate ratio to fit inside 1024x1024
    $ratioX = $targetWidth / $img.Width
    $ratioY = $targetHeight / $img.Height
    $ratio = [Math]::Min($ratioX, $ratioY)
    
    $newWidth = [int]($img.Width * $ratio)
    $newHeight = [int]($img.Height * $ratio)
    
    # Create new 1024x1024 bitmap
    $newImg = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight
    
    # Make it transparent
    $g = [System.Drawing.Graphics]::FromImage($newImg)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    # Center the image
    $posX = [int](($targetWidth - $newWidth) / 2)
    $posY = [int](($targetHeight - $newHeight) / 2)
    
    $g.DrawImage($img, $posX, $posY, $newWidth, $newHeight)
    
    # Save the file
    $img.Dispose()
    $g.Dispose()
    
    $tempFile = "$($file.DirectoryName)\temp_$($file.Name)"
    $newImg.Save($tempFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $newImg.Dispose()
    
    Move-Item -Path $tempFile -Destination $file.FullName -Force
    Write-Host "Resized $($file.Name) to 1024x1024 (Padded)"
}
