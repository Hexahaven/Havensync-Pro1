pluginManagement {
    includeBuild(file("../node_modules/@react-native/gradle-plugin"))
    repositories {
        gradlePluginPortal()
        mavenCentral()
        google()
    }
    plugins {
        id("com.facebook.react.settings") 
    }
}

plugins {
    id("com.facebook.react.settings")
}

rootProject.name = "HexaHavenSmartHomeApp"
include(":app")