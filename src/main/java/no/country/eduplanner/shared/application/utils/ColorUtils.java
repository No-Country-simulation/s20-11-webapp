package no.country.eduplanner.shared.application.utils;

import org.springframework.stereotype.Component;

import java.awt.*;

@Component
public class ColorUtils {

    public String generateHexColor() {

        float hue = (float) Math.random();
        float saturation = 0.7f;
        float brightness = 0.95f;

        Color color = Color.getHSBColor(hue, saturation, brightness);
        return String.format("#%02X%02X%02X",
                color.getRed(),
                color.getGreen(),
                color.getBlue());
    }

}
