<?php if (_apple_splash_page()): // test if we want to display the apple.com-like splash page ?>

<?php if ($page['highlighted']): ?>
  <div id="highlighted"><?php print render($page['highlighted']); ?></div>
<?php endif; ?>

<div id="page-wrapper"><div id="page">

  <div id="header" class="<?php print $secondary_menu ? 'with-secondary-menu': 'without-secondary-menu'; ?>"><div class="section clearfix">

    <?php if ($logo): ?>
      <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo">
        <!--<img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />-->
      </a>
    <?php endif; ?>

    <?php if ($site_name || $site_slogan): ?>
      <div id="name-and-slogan"<?php if ($hide_site_name && $hide_site_slogan) { print ' class="element-invisible"'; } ?>>

        <?php if ($site_name): ?>
          <?php if ($title): ?>
            <div id="site-name"<?php if ($hide_site_name) { print ' class="element-invisible"'; } ?>>
              <strong>
                <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
              </strong>
            </div>
          <?php else: /* Use h1 when the content title is empty */ ?>
            <h1 id="site-name"<?php if ($hide_site_name) { print ' class="element-invisible"'; } ?>>
              <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
            </h1>
          <?php endif; ?>
        <?php endif; ?>

        <?php if ($site_slogan): ?>
          <div id="site-slogan"<?php if ($hide_site_slogan) { print ' class="element-invisible"'; } ?>>
            <?php print $site_slogan; ?>
          </div>
        <?php endif; ?>

      </div> <!-- /#name-and-slogan -->
    <?php endif; ?>

    <?php print render($page['header']); ?>

    <?php if ($main_menu): ?>
      <div id="main-menu" class="navigation">
        <?php print theme('links__system_main_menu', array(
          'links' => $main_menu,
          'attributes' => array(
            'id' => 'main-menu-links',
            'class' => array('links', 'clearfix'),
          ),
          'heading' => array(
            'text' => t('Main menu'),
            'level' => 'h2',
            'class' => array('element-invisible'),
          ),
        )); ?>
      </div> <!-- /#main-menu -->
    <?php endif; ?>

  </div></div> <!-- /.section, /#header -->

  <?php if ($messages): ?>
    <div id="messages"><div class="section clearfix">
      <?php print $messages; ?>
    </div></div> <!-- /.section, /#messages -->
  <?php endif; ?>

  <?php if ($page['featured']): ?>
    <div id="featured"><div class="section clearfix">
      <?php print render($page['featured']); ?>
    </div></div> <!-- /.section, /#featured -->
  <?php endif; ?>

  <!-- 'splash page' content starts here :) -->
  <div class="slide-wrapper one">
      <section class="slide one">
        <img class="slide-image" src="<?php print '/'.drupal_get_path('theme', 'responsive_bartik').'/images/splash/slide1.png'; ?>" />
        <div class="copy">
          <h3>The world is changing…</h3>
          <p>Parents want their kids equipped to succeed. So do teachers. So do we. </p>
          <p>The world is changing – and we have to change too. Technology and innovation are reshaping society – and the future.</p>
          <p>That's why it's critical we refine our education system, designed in the last century, so students can succeed in the 21st Century.</p>
        </div>
      </section>
  </div>

  <div class="slide-wrapper two">
      <section class="slide two">
        <img class="slide-image" src="<?php print '/'.drupal_get_path('theme', 'responsive_bartik').'/images/splash/slide2.png'; ?>" />
        <div class="copy">
          <h3>Meeting the challenge…</h3>
          <p>Parents expect their kids to learn the basics – reading, writing and arithmetic. Well imagine them doing this through real-world situations. </p>
          <p>The key to making this happen is our new curriculum – the plan that maps out what teachers teach and what students are expected to learn. </p>
          <p>Students will get hands-on experience in collaboration, critical thinking and communications – skills they'll need to succeed in college, university, and the workforce.</p>
        </div>
      </section>
  </div>

  <div class="slide-wrapper three">
      <section class="slide three">
        <img class="slide-image" src="<?php print '/'.drupal_get_path('theme', 'responsive_bartik').'/images/splash/slide3.png'; ?>" />
        <div class="copy">
          <h3>Capturing the energy…</h3>
          <p>We all know how passionate kids can get about something that interests them – whether it's dinosaurs, soccer, or music. Personalized learning taps into that passion.</p>
          <p>Imagine what's possible if we can capture the energy and focus from those passions and connect them to classroom learning. Whether it’s computers, hockey, or art, passion is a motivator. </p>
          <p>Personalized learning is at the heart of the new curriculum and makes it easy for kids to engage, connect and succeed.</p>
        </div>
      </section>
  </div>

  <div class="slide-wrapper four">
      <section class="slide four">
        <img class="slide-image" src="<?php print '/'.drupal_get_path('theme', 'responsive_bartik').'/images/splash/slide4.jpg'; ?>" />
        <div class="copy">
          <h3>Chasing a dream…</h3>
          <p>Every student has a dream. Think of the number of kids who want to be a vet. </p>
          <p>Angela, a high-school student in rural B.C., has a head start. She's earning credits while working directly with horses at a local stable. She's learning biology and anatomy.</p>
          <p>She's also learning how to be part of a team and how to deal with clients - skills for future success.</p>
        </div>
      </section>
  </div>

  <div class="slide-wrapper five">
      <section class="slide five">
        <img class="slide-image" src="<?php print '/'.drupal_get_path('theme', 'responsive_bartik').'/images/splash/slide5.png'; ?>" />
        <div class="copy">
          <h3>Applying what's learned…</h3>
          <p>Math students in a central B.C. school are building First Nations projects like small wooden structures, sweaters, and furniture. </p>
          <p>It's a hands-on way of learning math. They use measurements, come up with formulas, and figure out how to put things together. </p>
          <p>So Arlin, a Grade 9 student, is already building the basic skills she needs to one day build a house – and a career.</p>
        </div>
      </section>
  </div>

  <div class="slide-wrapper six">
      <section class="slide six">
        <img class="slide-image" src="<?php print '/'.drupal_get_path('theme', 'responsive_bartik').'/images/splash/slide6.png'; ?>" />
        <div class="copy">
          <h3>Blasting off to the future…</h3>
          <p>Parents know first hand how video games are a part of life – at home, on mobile devices.</p>
          <p>Some students are turning their gaming passions into knowledge and into job skills.</p>
          <p>Kids at one Lower Mainland school are learning about technology, business, and coding by creating digital movies, online media content, and video games.</p>
          <p>Hard skills in software will connect their school experience to a high-tech future.</p>
        </div>
      </section>
  </div>

  <div class="slide-wrapper seven">
      <section class="slide seven">
        <img class="slide-image" src="<?php print '/'.drupal_get_path('theme', 'responsive_bartik').'/images/splash/slide7.png'; ?>" />
        <div class="copy">
          <h3>Created through collaboration</h3>
          <p>Change doesn't happen in a vacuum.</p>
          <p>Over the past three years government has been working with more than 100 B.C. teachers and world-leading experts to collaborate on finding the right game plan to prepare students for success.</p>
          <p>They have harnessed the best practices and research from all over the world. They are applying that to B.C.'s world-leading education system so our kids can stay on top in a changing world.</p>
        </div>
      </section>
  </div>

  <div class="slide-wrapper eight">
      <section class="slide eight">
        <img class="slide-image" src="<?php print '/'.drupal_get_path('theme', 'responsive_bartik').'/images/splash/slide8.png'; ?>" />
        <div class="copy">
          <h3>Phasing in change…</h3>
          <p>We're taking the next three years to bring the personalized learning approach of the new curriculum into classrooms. </p>
          <p>This fall is the first step when teachers in Kindergarten through Grade 9 have the option to use the new plan. </p>
          <p>Teachers, school administrators and the Ministry of Education are all working together so our students are ready for a changing world.</p>
          <a style="font-size: 125%; text-shadow: none; color: gold;" href="/home">Explore the new curriculum</a>
        </div>
      </section>
  </div>

</div></div> <!-- /#page, /#page-wrapper -->

<?php else: /* if _apple_splash_page() returns FALSE */ ?>
  <?php include 'page.tpl.php'; ?>
<?php endif; ?>
