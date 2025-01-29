package no.country.eduplanner.shared.application.utils;

import no.country.eduplanner.shared.domain.vo.AdaptableColor;
import org.springframework.stereotype.Component;

import java.awt.*;

@Component
public class ColorUtils {

    private static final double GOLDEN_RATIO_CONJUGATE = 0.618033988749895;

    public String generateHexColor() {

        double lastHue = (Math.random() * GOLDEN_RATIO_CONJUGATE) % 1.0;
        float randomness = (float) Math.random();

        float saturation = 0.6f + (float) (randomness * 0.2);
        float brightness = 0.8f + (float) (randomness * 0.2);

        Color color = Color.getHSBColor((float) lastHue, saturation, brightness);

        return String.format("#%02X%02X%02X",
                color.getRed(),
                color.getGreen(),
                color.getBlue());
    }

    public String generateDarkColor(String baseHexColor) {
        Color baseColor = Color.decode(baseHexColor);

        // reduce brightness to make the color darker
        float[] hsb = Color.RGBtoHSB(baseColor.getRed(), baseColor.getGreen(), baseColor.getBlue(), null);
        Color darkColor;
        float brightness = hsb[2];
        float targetLuminance = 0.2f;

        while (getRelativeLuminance(darkColor = Color.getHSBColor(hsb[0], hsb[1], brightness)) > targetLuminance) {
            brightness *= 0.9f;
            if (brightness < 0.01f) break;
        }

        return String.format("#%02X%02X%02X", darkColor.getRed(), darkColor.getGreen(), darkColor.getBlue());

    }

    public String generateLightColor(String baseHexColor) {
        Color baseColor = Color.decode(baseHexColor);
        // increase brightness
        float[] hsb = Color.RGBtoHSB(baseColor.getRed(), baseColor.getGreen(), baseColor.getBlue(), null);
        Color lightColor;
        float brightness = hsb[2];
        float targetLuminance = 0.9f;

        while (getRelativeLuminance(lightColor = Color.getHSBColor(hsb[0], hsb[1], brightness)) < targetLuminance) {
            brightness *= 1.1f;
            if (brightness > 1.0f) {
                brightness = 1.0f;
                break; // Prevent exceeding maximum brightness
            }
        }

        return String.format("#%02X%02X%02X", lightColor.getRed(), lightColor.getGreen(), lightColor.getBlue());

    }

    public AdaptableColor createAdaptableColor() {
        String baseColor = generateHexColor();
        return new AdaptableColor(generateDarkColor(baseColor), generateLightColor(baseColor));
    }

    public AdaptableColor createAdaptableColor(String baseColor) {
        return new AdaptableColor(generateDarkColor(baseColor), generateLightColor(baseColor));
    }



    // formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
    private double getRelativeLuminance(Color color) {
        double r = color.getRed() / 255.0;
        double g = color.getGreen() / 255.0;
        double b = color.getBlue() / 255.0;

        r = (r <= 0.03928) ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        g = (g <= 0.03928) ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        b = (b <= 0.03928) ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

}
