var imageList = [
  {
    id: 3199286,
    obfuscated_id: "c666f14c8f7b05812bc118ce4e9a5b45",
    user_id: 1316,
    title: "Imagination #3199286",
    prompt:
      "Summer forest trail, wide depth of field, realistic mushrooms, real wood, Maple, Spruce, Pine, Oak, sprouts, dew, overcast, cloudy, clover, near a gentle stream, real buttefly, real plants, real rocks, forest debris, depth, contrast, textures, natural light, mushrooms, stumps sticks, beauty, nature, expert techniques, organic feel, three-dimensionality, intricate details, captivating, White Balance, HDR, trees, butterflies, flat lighting",
    username: "jloe@ctlondon.com",
    status: "complete",
    queue_position: 1,
    file_url: "https://blockade-platform-production.s3.amazonaws.com/images/imagine/vr_summer_forest_trail_wide_depth_field_realistic_mushrooms_real__8ccdaf7027814806__3199286_8cc.jpg?ver=1",
    thumb_url: "https://blockade-platform-production.s3.amazonaws.com/thumbs/imagine/thumb_vr_summer_forest_trail_wide_depth_field_realistic_mushrooms_real__8ccdaf7027814806__3199286_8cc.jpg?ver=1",
    depth_map_url: "https://blockade-platform-production.s3.amazonaws.com/depths/imagine/vr_summer_forest_trail_wide_depth_field_realistic_mushrooms_real__8ccdaf7027814806__3199286_8cc.jpg?ver=1",
    created_at: "2023-05-06T16:06:36+00:00",
    updated_at: "2023-05-06T16:06:57+00:00",
    error_message: null,
    pusher_channel: "status_update_c666f14c8f7b05812bc118ce4e9a5b45",
    pusher_event: "status_update",
    type: "skybox",
    skybox_style_id: 13,
    skybox_id: 13,
    skybox_style_name: "Advanced (no style)",
    skybox_name: "Advanced (no style)",
    dispatched_at: "2023-05-06T16:06:36+00:00",
    processing_at: "2023-05-06T16:06:38+00:00",
    completed_at: "2023-05-06T16:06:57+00:00",
  },
  {
    id: 3201812,
    obfuscated_id: "0e17e261a0ccc7b6d0e40d7d064e9f09",
    user_id: 1316,
    title: "Imagination #3201812",
    prompt:
      "Cyberpunk forest trail, wide depth of field, realistic mushrooms, real wood, Maple, Spruce, Pine, Oak, sprouts, dew, overcast, cloudy, clover, near a gentle stream, real buttefly, real plants, real rocks, forest debris, depth, contrast, textures, natural light, mushrooms, stumps sticks, beauty, nature, expert techniques, organic feel, three-dimensionality, intricate details, captivating, White Balance, HDR, trees, butterflies, flat lighting, Cyberpunk",
    username: "jloe@ctlondon.com",
    status: "complete",
    queue_position: 1,
    file_url: "https://blockade-platform-production.s3.amazonaws.com/images/imagine/vr_cyberpunk_forest_trail_wide_depth_field_realistic_mushrooms_real__d4bd927c0f44607a__3201812_.jpg?ver=1",
    thumb_url: "https://blockade-platform-production.s3.amazonaws.com/thumbs/imagine/thumb_vr_cyberpunk_forest_trail_wide_depth_field_realistic_mushrooms_real__d4bd927c0f44607a__3201812_.jpg?ver=1",
    depth_map_url: "https://blockade-platform-production.s3.amazonaws.com/depths/imagine/vr_cyberpunk_forest_trail_wide_depth_field_realistic_mushrooms_real__d4bd927c0f44607a__3201812_.jpg?ver=1",
    created_at: "2023-05-06T17:42:31+00:00",
    updated_at: "2023-05-06T17:42:52+00:00",
    error_message: null,
    pusher_channel: "status_update_0e17e261a0ccc7b6d0e40d7d064e9f09",
    pusher_event: "status_update",
    type: "skybox remix",
    skybox_style_id: 13,
    skybox_id: 13,
    skybox_style_name: "Advanced (no style)",
    skybox_name: "Advanced (no style)",
    dispatched_at: "2023-05-06T17:42:31+00:00",
    processing_at: "2023-05-06T17:42:32+00:00",
    completed_at: "2023-05-06T17:42:52+00:00",
  }
];

import loadTex from "./3DUI_depth.js";

let apiKey = ``;
// const container = document.getElementById("container");

function LoadHandlebarsTemplates() {
  const categories = Array.from(new Set(imageList.map((image) => image.type)));

  const c2 = categories.map((category) => {
    return {
      name: category.replace(' ', '-'),
      images: imageList
        .filter((image) => image.type === category)
        .map((image) => {
          return {
            title: image.title,
            src: image.file_url,
            thumbSrc: image.thumb_url,
            alt: image.prompt,
            details: {
              creator: `Created by ${image.username} on ${new Date(image.created_at).toLocaleDateString()}`,
              prompt: image.prompt,
              negativePrompt: image.negative_text,
              seed: image.id,
              depthSrc: image.depth_map_url,
              styleId: image.skybox_style_id,
              styleName: image.skybox_style_name
            },
          };
        }),
    };
  });

  const tabsTemplate = Handlebars.compile($("#tabs-template").html());
  const contentTemplate = Handlebars.compile($("#content-template").html());
  // const modalTemplate = Handlebars.compile($("#modal-template").html());

  $("#categoryTabs").html(tabsTemplate({ categories: c2 }));
  //   $("#categoryContent").html(contentTemplate({ categories }));

  //   const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));

  //   $("#categoryTabs").html(tabsTemplate({ categories }));
  $("#categoryContent").html(
    contentTemplate({
      categories: c2,
    })
  );

  // Store the details data as a jQuery data attribute
  $("#categoryContent .image-card").each(function (index) {
    $(this).data("details", c2.flatMap((category) => category.images)[index].details);
  });

  const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));
  // createViewport(createConfig(''))
  $("#categoryContent").on("click", ".card", function () {
    const src = $(this).find(".card-img-top").attr("full_res");
    const title = $(this).find(".card-title").text();
    const alt = $(this).find(".card-img-top").attr("alt");
    const details = $(this).data("details");

    $("#imageModalLabel").text(title);
    $("#imageModalImg").attr("src", src).attr("alt", alt);
    // $("#imageModalImg").attr("src", src).attr("alt", alt);
    $("#imageModalDetails .creator").text(details.creator);
    $("#imageModalDetails .prompt").text(details.prompt);
    $("#imageModalDetails .negative-prompt").text(details.negativePrompt);
    $("#imageModalDetails .seed").text(details.seed);
    $("#imageModalDetails .styleID").text(details.styleId);
    $("#imageModalDetails .styleName").text(details.styleName);
    $("#imageModalDetails .rgbUrl").text(src);
    $("#imageModalDetails .depthUrl").text(details.depthSrc);

    imageModal.show();

    loadTex(src, details.depthSrc);

    // createViewport2(createConfig(src, title));
  });

  // Close modal when clicking outside the modal or on the close button
  $("#imageModal").on("click", ".modal-dialog, .btn-close", function (e) {
    if (e.target !== this) return;
    // closeViewport();
    imageModal.hide();
  });
}

async function fetchImageList(params) {
  const response = await fetch(`https://backend.blockadelabs.com/api/v1/imagine/myRequests?${new URLSearchParams(params)}`, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${apiKey}`
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}

async function generateImage(request_details, params) {
  const generateImagineUrl = `https://backend.blockadelabs.com/api/v1/imagine/requests?${new URLSearchParams(params)}`;

  const response = await fetch(generateImagineUrl, request_details);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data.data;
}

async function generateSkyboxRemix(formData, params) {
  const skyboxUrl = `https://backend.blockadelabs.com/api/v1/skybox?${new URLSearchParams(params)}`;

  const response = await fetch(skyboxUrl, formData)
    .then((response) => response.json())
    .then((data) => {
      console.log("Skybox Remix generated:", data);
    })
    .catch((error) => {
      console.error("Error generating Skybox Remix:", error);
    });
  console.log(response);
  return response;
}

$(document).ready(function () {
  LoadHandlebarsTemplates();

  $("#image-query-form").on("submit", async function (event) {
    event.preventDefault();

    let params = {
      //   status: $("#status").val(),
      limit: $("#limit").val(),
      api_key: apiKey,
      //   offset: $("#offset").val(),
      //   query: $("#query").val(),
      //   generator: $("#generator").val(),
    };

    try {
      imageList = await fetchImageList(params);
      LoadHandlebarsTemplates();
      //   displayImages(imageList);
    } catch (error) {
      console.error("Error fetching image list:", error);
    }
  });

  const generateSkyboxForm = document.getElementById("generate-skybox-form");
  generateSkyboxForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formElements = event.target.elements;
    const formData = {
      // generator: formElements.generator.value,
      prompt: formElements["skybox-prompt"].value,
      negative_text: formElements["skybox-negative-text"].value,
      return_depth: formElements["skybox-depth"].value,
      // seed: formElements.seed.value,
      // animation_mode: formElements["animation-mode"].value,
      // webhook_url: formElements["webhook-url"].value,
      skybox_style_id: formElements["skybox-skybox-style"].value,

    };

    const remixID = formElements["skybox-remix-imagine-id"].value;
    if (remixID) {
      data.remix_imagine_id = remixID;
    }

    const queryStringData = {
      api_key: apiKey,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    console.log(formData);
    let sky_response = generateSkyboxRemix(requestOptions, queryStringData);
  });

  if (false) {
    const generateImagineForm = document.getElementById("generate-imagine-form");

    generateImagineForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formElements = event.target.elements;
      const formData = {
        generator: formElements.generator.value,
        prompt: formElements.prompt.value,
        negative_text: formElements["negative-text"].value,
        // seed: formElements.seed.value,
        // animation_mode: formElements["animation-mode"].value,
        // webhook_url: formElements["webhook-url"].value,
        skybox_style_id: formElements["skybox-style"].value,
      };
      const queryStringData = {
        api_key: apiKey,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      let gen_response = generateImage(requestOptions, queryStringData);

      // const response = await axios.post(API_ENDPOINT, {
      //   api_key: API_KEY,
      //   prompt: prompt,
      //   remix_imagine_id: remixImagineId,
      //   skybox_style_id: skyboxStyleId,
      //   webhook_url: webhookUrl
      // });

      // const data = response.data;

      // console.log('Skybox Remix generated:', data);

      // console.log(gen_response);
    });
  }

  const apiKeyForm = document.getElementById("api-key-form");

  apiKeyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formElements = event.target.elements;
    apiKey = formElements.api_key.value;
    console.log(apiKey);
    const skyboxStylesUrl = "https://backend.blockadelabs.com/api/v1/skybox/styles?api_key=" + apiKey;
    const skyboxStyleSelect = document.getElementById("skybox-style");
    const skyboxStyleSelect2 = document.getElementById("skybox-skybox-style");
    fetch(skyboxStylesUrl)
      .then((response) => response.json())
      .then((styles) => {
        styles.forEach((style) => {
          const option = document.createElement("option");
          option.value = style.id;
          option.text = style.name;
          skyboxStyleSelect.add(option);
          skyboxStyleSelect2.add(option);
        });

        const loadedAlert = document.getElementById("loaded_alert");
        loadedAlert.textContent = `Successfully Loaded Key`;
        loadedAlert.hidden = false;
      });
  });
});

fetch("https://bootswatch.com/api/5.json")
  .then((response) => response.json())
  .then((data) => load(data));

function load(data) {
  const themes = data.themes;
  let select = document.querySelector("#css_select");

  themes.forEach((value, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = value.name;

    select.append(option);
  });
  select.value = 2;

  select.addEventListener("change", (e) => {
    const theme = themes[e.target.value];
    document.querySelector("#theme").setAttribute("href", theme.css);
    document.querySelector(".alert h1").textContent = theme.name;
  });

  //   const changeEvent = new Event('change');
  //   select.dispatchEvent(changeEvent);
}
